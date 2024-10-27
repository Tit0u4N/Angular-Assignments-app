let Assignment = require('../model/assignment');




// Récupérer tous les assignments (GET)
function getAssignments(req, res) {
    const aggregate = Assignment.aggregate();

    Assignment.aggregatePaginate(aggregate, {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 2,
    }, (err, assignments) => {
        console.log(assignments);
        if (err) {
            res.send({
                data: null,
                message: 'Cannot get assignments',
                type: 'error'
            })
        }
        res.send({
            data: assignments,
            message: 'Success',
            type: 'success'
        });
    });
}

// Récupérer un assignment par son id (GET)
function getAssignment(req, res) {
    let assignmentId = req.params.id;

    Assignment.findOne({id: assignmentId}, (err, assignment) => {
        if (err) {
            res.send(err)
        }
        res.json({
            data: assignment,
            message: 'Success',
            type: 'success'
        });
    })
}

// Ajout d'un assignment (POST)
function postAssignment(req, res) {
    let assignment = new Assignment();
    assignment.id = req.body.id;
    assignment.title = req.body.title;
    assignment.date = req.body.date;
    assignment.status = req.body.status;

    console.log("POST assignment reçu :");
    console.log(assignment)

    assignment.save((err) => {
        if (err) {
            res.send({
                data: null,
                message: 'Cannot save the assignment',
                type: 'error'
            });
        }
        res.json({
            data: assignment,
            message: `${assignment.title} saved!`,
            type: 'success'
        })
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send({
                data: null,
                message: 'Cannot update the assignment',
                type: 'error'
            })
        } else {
            res.json({
                data: assignment,
                message: 'Assignment updated',
                type: 'success'
            })
        }
    });

}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {
    console.log(req.params.id)
    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send({
                data: null,
                message: 'Cannot delete the assignment',
                type: 'error'
            });
        }
        res.json({
            data: assignment,
            message: `${assignment.title} deleted`,
            type: 'success'
        });
    })
}

module.exports = {getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment};
