const {Employee} = require('../models')
const jobtitles =['CEO', 'VP']
const states = ['CA', 'AZ']

module.exports.displayEmployees = async function(req, res){
    const employees = await Employee.findAll();
    res.render('index', {employees})
}

module.exports.renderAddEmployeeForm = function(req, res){
    res.render('createUserForm',
        {
            employee: {
                firstname:'',
                lastname:'',
                jobtitles:jobtitles[0],
                streetline1:'',
                streetline2:'',
                city:'',
                state:states[0],
                zip:'',
                phonenumber:'',
                yearhired:'',
                salary:'',
            },
            jobtitles,
            stateslist:states
        });
}

module.exports.addEmployee = async function(req, res){
    const person=await Employee.create(
        {
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            jobtitle:req.body.jobtitle,
            streetline1:req.body.streetline1,
            streetline2:req.body.streetline2,
            city:req.body.city,
            state:req.body.state,
            zip:req.body.zip,
            phonenumber:req.body.phonenumber,
            yearhired:req.body.yearhired,
            salary:req.body.salary,
        },
    );
    console.log(person)
    res.redirect('/');
}

module.exports.renderUpdateForm = async function(req, res){
    const employee = await Employee.findByPk(req.params.id);
    res.render('edit', {
        employee,
        jobtitles,
        stateslist:states
    })
}

module.exports.updateEmployee = async function(req, res){
    const person =await Employee.update(
        {
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        jobtitle:req.body.jobtitle,
        streetline1:req.body.streetline1,
        streetline2:req.body.streetline2,
        city:req.body.city,
        state:req.body.state,
        zip:req.body.zip,
        phonenumber:req.body.phonenumber,
        yearhired:req.body.yearhired,
        salary:req.body.salary
        },
        {
        where: {
            id: req.params.id
        }
    });
    console.log(person);
    res.redirect('/');
}

module.exports.deleteEmployee = async function(req, res){
    await Employee.destroy({
        where:{
            id: req.params.id
        }
    });
    res.redirect('/')
}