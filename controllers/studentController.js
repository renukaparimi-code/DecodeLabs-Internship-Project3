const fs = require("fs");

const FILE =
"./data/students.json";

const getStudents = (req, res) => {

    const data =
    JSON.parse(
        fs.readFileSync(FILE)
    );

    res.json(data);
};

const addStudent = (req, res) => {

    const students =
    JSON.parse(
        fs.readFileSync(FILE)
    );

    const student = {
        id: Date.now(),
        name: req.body.name,
        roll: req.body.roll,
        department: req.body.department
    };

    students.push(student);

    fs.writeFileSync(
        FILE,
        JSON.stringify(
            students,
            null,
            2
        )
    );

    res.json(student);
};

const deleteStudent = (req, res) => {

    let students =
    JSON.parse(
        fs.readFileSync(FILE)
    );

    students =
    students.filter(
        student =>
        student.id != req.params.id
    );

    fs.writeFileSync(
        FILE,
        JSON.stringify(
            students,
            null,
            2
        )
    );

    res.json({
        message: "Deleted"
    });
};

module.exports = {
    getStudents,
    addStudent,
    deleteStudent
};