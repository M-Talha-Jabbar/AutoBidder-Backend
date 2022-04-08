const { closeAuctionRoom, closeAuctionBids } = require("../controllers/auctionRoomController");
const { auctionRoomState, getAuctionRoomState, setHighestBid, biddersBid, setLastBid, clearRoom, clearBidders } = require("../utils");

module.exports = (auctionRoomNamespace, socket) => {
    //console.log(auctionRoomNamespace);
    //console.log(socket.id);

    const joinRoom = ({ RoomID, BiddingID }) => {
        socket.join(RoomID);

        const room = auctionRoomState(RoomID);
        socket.emit('auction:updateBid', { bid: room.highestBid, bidderID: room.bidderID, bidCount: room.bidCount }); // sending current auction state

        if(BiddingID){
            const bidder = biddersBid(RoomID, BiddingID);
            socket.emit('auction:updateLastBid', { lastBid: bidder.lastBid, bidCount: bidder.bidCount });
        } // otherwise, the auction room is "View-only"
    };

    const bidPlaced = ({ RoomID, bid, bidderID }) => {
        //console.log(bid);

        // if current bid is less than or equal to the highest bid and starting bid than it will be handled on the frontend

        setHighestBid(RoomID ,bid, bidderID);
        const room = auctionRoomState(RoomID); // get current auction state
        auctionRoomNamespace.to(RoomID).emit('auction:updateBid', { bid: room.highestBid, bidderID: room.bidderID, bidCount: room.bidCount });

        setLastBid(RoomID, bidderID, bid);
        const bidder = biddersBid(RoomID, bidderID);
        socket.emit('auction:updateLastBid', { lastBid: bidder.lastBid, bidCount: bidder.bidCount });
        //console.log(bidder.bidCount);
    };

    const auctionEnded = ({ RoomID, BiddingID }) => {
        const room = getAuctionRoomState(RoomID);

        if(room){
            closeAuctionRoom(RoomID, room.highestBid, (room.bidderID === '---') ? null : room.bidderID, room.bidCount)
                .then(result => { console.log(result); clearRoom(RoomID); })
                .catch(err => console.log(err));

            const getBiddersOfARoom = clearBidders(RoomID);

            getBiddersOfARoom.forEach(bidder => {
                closeAuctionBids(RoomID, bidder.bidderID, (bidder.lastBid === 'No Bid placed') ? 0 : bidder.lastBid, bidder.bidCount)
                    .then(result => console.log(result) )
                    .catch(err => console.log(err));
            });
        }
    };


    socket.on('auction:joinRoom', joinRoom);
    socket.on('auction:bidPlaced', bidPlaced);
    socket.on('auction:end', auctionEnded);
};