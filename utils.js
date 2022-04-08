function getDate(days){
    var today = new Date();
    today.setDate(today.getDate() + days);
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var hh=String(today.getHours()).padStart(2,'0');
    var MM=String(today.getMinutes()).padStart(2,'0');
    var ss=String(today.getSeconds()).padStart(2,'0')
    var yyyy = today.getFullYear();

   let date1=  yyyy+'-'+mm+'-'+dd+" "+hh+':'+MM+':'+ss;
    return date1;
//2021-12-27 12:23:48
}


let roomsState = []; // highest bidder with his bid & total number of bids placed in a particular auction

function auctionRoomState(RoomID){
    let room = roomsState.find(room => room.RoomID === RoomID);
    
    if(room){
        
    }
    else{
        room = { RoomID , highestBid: 0, bidderID: '---', bidCount: 0 };
        roomsState.push(room);
    }

    return room;
}

function getAuctionRoomState(RoomID){
    let room = roomsState.find(room => room.RoomID === RoomID);

    return room || null;
}

function setHighestBid(RoomID, bid, bidderID){
    const roomIndex = roomsState.findIndex(room => room.RoomID === RoomID);
    roomsState[roomIndex].highestBid = bid;
    roomsState[roomIndex].bidderID = bidderID;
    roomsState[roomIndex].bidCount += 1;
}


let bidders = []; // last bid & total number of bids placed by a bidder in a particular auction

function biddersBid(RoomID, bidderID){
    let bidder = bidders.find(bidder => bidder.bidderID === bidderID && bidder.RoomID === RoomID);

    if(bidder){

    }
    else{
        bidder = { RoomID, bidderID, lastBid: 'No Bid placed', bidCount: 0 };
        bidders.push(bidder);
    }

    return bidder;
}

function setLastBid(RoomID, bidderID, lastBid){
    const bidderIndex = bidders.findIndex(bidder => bidder.bidderID === bidderID && bidder.RoomID === RoomID);
    bidders[bidderIndex].lastBid = lastBid;
    bidders[bidderIndex].bidCount += 1;
}

function clearRoom(RoomID){
    //console.log(roomsState);
    let newRoomState = roomsState.filter(room => room.RoomID !== RoomID);
    roomsState = newRoomState;
    //console.log(roomsState);
}

function clearBidders(RoomID){
    //console.log(bidders);
    let getBidders = bidders.filter(bidder => bidder.RoomID === RoomID);
    let newBiddersArray = bidders.filter(bidder => bidder.RoomID !== RoomID);
    bidders = newBiddersArray;
    //console.log(bidders);

    return getBidders;
}

module.exports={ 
    getDate, auctionRoomState, getAuctionRoomState, setHighestBid, biddersBid, setLastBid, clearRoom, clearBidders
};