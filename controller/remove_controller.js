const User = require('../models/user');

module.exports.removeToggle = async function (req, res) {
    let otherUser = await User.findById(req.query.id);
    let localUser = await User.findById(req.user.id);
    localUser.friends = localUser.friends.filter(check);
    otherUser.friends = otherUser.friends.filter(check2);
    function check(person) {
        if (String(person) != String(otherUser._id)) {
            console.log('Krishan', person);
            return person;
        }
    }

    function check2(person) {
        if (String(person) != String(localUser._id)) {
            return person;
        }
    }
    otherUser.save();
    localUser.save();
    if (req.xhr) {
        return res.status(200).json({
            data: {
                otherUser: otherUser,
            },
            message: "users added",
        })
    }

    return res.redirect('back');
}