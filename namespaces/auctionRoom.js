const { auctionRoomState, setHighestBid, biddersBid, setLastBid } = require("../utils");

module.exports = (auctionRoomNamespace, socket) => {
    //console.log(auctionRoomNamespace);
    //console.log(socket.id);

    const joinRoom = ({ RoomID, BiddingID }) => {
        socket.join(RoomID);

        const room = auctionRoomState(RoomID);
        socket.emit('auction:updateBid', { bid: room.highestBid, bidderID: room.bidderID }); // sending current auction state

        if(BiddingID){
            const bidder = biddersBid(RoomID, BiddingID);
            socket.emit('auction:updateLastBid', { lastBid: bidder.lastBid });
        } // otherwise, the auction room is "View-only"
    };

    const bidPlaced = ({ RoomID, bid, bidderID }) => {
        //console.log(bid);

        // if current bid is less than or equal to the highest bid than it will be handled on the frontend

        setHighestBid(RoomID ,bid, bidderID);
        const room = auctionRoomState(RoomID); // get current auction state
        auctionRoomNamespace.to(RoomID).emit('auction:updateBid', { bid: room.highestBid, bidderID: room.bidderID });

        setLastBid(RoomID, bidderID, bid);
        const bidder = biddersBid(RoomID, bidderID);
        socket.emit('auction:updateLastBid', { lastBid: bidder.lastBid });
    };

    socket.on('auction:joinRoom', joinRoom);
    socket.on('auction:bidPlaced', bidPlaced);
};