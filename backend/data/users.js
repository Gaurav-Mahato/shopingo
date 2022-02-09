import bcrypt from "bcryptjs";

const users = [
    {
        name: "Gaurav Mahato",
        email: "gaurav@example.com",
        password: bcrypt.hashSync("12345", 10),
        isAdmin: true
    },
    {
        name: "Akshat Singhal",
        email: "akshat@example.com",
        password: bcrypt.hashSync("12345", 10),
    },
    {
        name: "Akshat Nigam",
        email: "akshat@niggu.com",
        password: bcrypt.hashSync("12345", 10)
    }
]

export default users;