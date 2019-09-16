pragma solidity 0.5.8;

contract Users {
// Model a Candidate
    struct User {
        string id;
        uint appliedCount;
        uint confirmedCount;
    }

    // Read/write candidates
    mapping(string => User) public userMap;

    // constructor() public {
    //     addCandidate("Candidate 1");
    //     addCandidate("Candidate 2");
    // }

    function userApplied (string memory _id) public {
        User memory user = userMap[_id];
        user.appliedCount++;
        userMap[_id] = user;
    }

    function userConfirmed (string memory _id) public {
        User memory user = userMap[_id];
        user.confirmedCount++;
        userMap[_id] = user;
    }
}