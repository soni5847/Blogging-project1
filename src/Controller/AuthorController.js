

const createAuthor = async function (req, res) {
    let data = req.body;
    let NewData = await authorModel.create(data);
    res.status(201).send({ message: NewData });
}



module.exports.createAuthor=createAuthor;