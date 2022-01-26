db.tours.aggregate([
  { 
    "$addFields": {
      "locations": {
        "$map": {
          "input": "$locations",
          "in": {
            "$mergeObjects": [
              "$$this",
              {
                "dest_oid": {
                  "$toObjectId": "$$this.destination.id"
                }
              }
            ]
          }
        }
      }
    }
  },
  { "$unwind": "$locations" },

  { "$lookup": {
    "from": "destinations",
    "localField": "locations.dest_oid",
    "foreignField": "_id",
    "as": "locations.dest",
  }},
  { "$unwind": "$locations.dest" },
  { "$group": {
    "_id": "$_id",
    "locations": { "$push": "$locations" }
  }}
])