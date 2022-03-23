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


const roomsState = []; // every auction with its highest bidder and his bid

function auctionRoomState(RoomID){
    let room = roomsState.find(room => room.RoomID === RoomID);
    
    if(room){
        
    }
    else{
        room = { RoomID , highestBid: 0, bidderID: '---' };
        roomsState.push(room);
    }

    return room;
}

function setHighestBid(RoomID, bid, bidderID){
    const roomIndex = roomsState.findIndex(room => room.RoomID === RoomID);
    roomsState[roomIndex].highestBid = bid;
    roomsState[roomIndex].bidderID = bidderID;
}


const bidders = []; // last bid of every bidder in a particular auction

function biddersBid(RoomID, bidderID){
    let bidder = bidders.find(bidder => bidder.bidderID === bidderID && bidder.RoomID === RoomID);

    if(bidder){

    }
    else{
        bidder = { RoomID, bidderID, lastBid: 'No Bid placed' };
        bidders.push(bidder);
    }

    return bidder;
}

function setLastBid(RoomID, bidderID, lastBid){
    const bidderIndex = bidders.findIndex(bidder => bidder.bidderID === bidderID && bidder.RoomID === RoomID);
    bidders[bidderIndex].lastBid = lastBid;
}

module.exports={ 
    getDate, auctionRoomState, setHighestBid, biddersBid, setLastBid
};