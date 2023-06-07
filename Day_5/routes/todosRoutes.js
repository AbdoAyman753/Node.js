const express = require('express');
const router = express.Router();
const To_Do = require('../models/to-do');
const {tokenAuth} = require('../utils/jwtAuth');

// get todos
router.get('/', tokenAuth, async (req,res)=>{
	// get all todos from database
	const {owner} = req.body;
	// console.log(owner);
	const to_dos = await To_Do.find({owner});
	res.send(to_dos);
})
// get todo by id
router.get('/:id', tokenAuth, async (req,res)=>{
	const {id}= req.params;
	const {owner} = req.body;
	const to_dos = await To_Do.findById({id,owner});
	res.send(to_dos);
})
// create todos
router.post('/',async (req,res)=>{
	// {title:"daflk",description:"sdfdsf",status:"to-do"}
    const new_todo = new To_Do({
        title:req.body.title,
        description:req.body.description,
        status:req.body.status,
		owner:req.body.owner
    });
    await new_todo.save();
	console.log('data',req.body)
	res.status(200).send(new_todo);
})
// update todos
// put : replace the old document with the new document
// patch: only modifies certain properties inside the document
router.patch('/:id',async (req,res)=>{
	const {id}= req.params;
	const {title,description,status}= req.body;
	await To_Do.findByIdAndUpdate(id,{title,description,status});

	res.status(200).send(await To_Do.findById(id));
})
// delete todos
router.delete('/:id',async(req,res)=>{
	const {id}= req.params;
	await To_Do.findByIdAndDelete(id);
	// delete todo by id
	res.send('todo deleted')
})

module.exports = router;