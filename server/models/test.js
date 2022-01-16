	db.users.aggregate([
		{$lookup: {
			from: "friends", 
			localField: "friends", 
			foreignField: "_id", 
			as: "userFriends"
		}},
	]).pretty()
		{
	      $lookup: {
	         from: "users",
	         localField: "userFriends",
	         foreignField: "_id",
	         as: "data"
	      }
	   },

     db.users.aggregate([
     {$match: { "friends": { $exists: true, $ne: null } } }, 
      { $lookup: { 
        from: "friends",  
        localField: "friends",  
        foreignField: "_id",  
        as: "userFriends" }
      }, 
      { $match: { "userFriends.requester": { $ne: ObjectId("61d98130b051eff9d06942c5") } } },
      { $project: {firstname: 1, lastname: 1, profileImage: 1}}
      ]).pretty()

  
// 6. Get all friends and check whether the logged in user is friend of that user or not

      // { "$project": { "status": 1 } }
db.users.aggregate([
  	{"$match": {_id: ObjectId("61d25aa76f862e4284ec6cd5")} },
  	{ 
  	"$lookup": {
    "from": "friends",
    "let": { "friends": "$friends" },
    "pipeline": [
      { "$match": {
        "recipient": ObjectId("61ccf9653833e3a7f86d4593"),
        "$expr": { "$in": [ "$_id", "$$friends" ] }
      }},
    ],
    "as": "friends"
  }},
  { "$addFields": {
    "friendsStatus": {
      "$ifNull": [ { "$min": "$friends.status" }, 0 ]
    }
  }}
])

db.users.aggregate( [
   {
      $lookup:
         {
            from: "friends",
            localField: "friends",
            let: {"friends": "$friends"},
        }
   }
] )

db.users.aggregate([
  { "$lookup": {
    "from": friends,
    "let": { "friends": "$friends" },
    "pipeline": [
      { "$match": {
        "recipient": ObjectId("61d25aa76f862e4284ec6cd5"),
        "$expr": { "$in": [ "$_id", "$$friends" ] }
      }},
      { "$project": { "status": 1 } }
    ],
    "as": "friends"
  }}
])

db.users.aggregate([
  { "$lookup": {
    "from": "friends",
    "let": { "friends": "$_id" },
    "pipeline": [
      { "$match": { "$expr": { "$eq": ["$party_id", "$$partyId"] }}},
      { "$lookup": {
        "from": "addressComment",
        "let": { "addressId": "$_id" },
        "pipeline": [
          { "$match": { "$expr": { "$eq": ["$address_id", "$$addressId"] }}}
        ],
        "as": "address"
      }}
    ],
    "as": "address"
  }},
  { "$unwind": "$address" }
])

db.users.aggregate([
{$match: {_id: ObjectId("61d25aa76f862e4284ec6cd5")}},
{$project: {"friends": 1}},
  { "$lookup": {
    "from": "friends",
    "pipeline": [
      { "$match": { "$expr": { "$eq": ["$requester", ObjectId("61d25aa76f862e4284ec6cd5")] }}},
      { "$lookup": {
        "from": "users",
        "let": { "recipientId": "$recipient" },
        "pipeline": [
          { "$match": { "$expr": { "$eq": ["$_id", "$$recipientId"] }}},
          {$project: {"firstname": 1, "lastname": 1, "profileImage": 1}}
        ],
        "as": "recipientInfo"
      }},
    ],
    "as": "userFriends"
  }},
  {$project: {"_id": 0, "userFriends": 1}},
  {$unwind: "$userFriends"}
]).pretty()






db.persons.aggregate([ 
	{ $group: 
		{ 
			_id: {gender: "$gender"}, 
			persons: {$push: {name: "$name"}} 
		} 
	},
	{$limit: 1}
	]).pretty()


db.users.aggregate([
  { "$lookup": {
    "from": "friends",
    "let": { "partyId": "$_id" },
    "pipeline": [
      { "$match": { "$expr": { "$eq": ["$party_id", "$$partyId"] }}},
      { "$lookup": {
        "from": "addressComment",
        "let": { "addressId": "$_id" },
        "pipeline": [
          { "$match": { "$expr": { "$eq": ["$address_id", "$$addressId"] }}}
        ],
        "as": "address"
      }}
    ],
    "as": "address"
  }},
  { "$unwind": "$address" }
])



















