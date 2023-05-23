const axios = require('axios')
const controller = {};

controller.getAll = async function(req, res) {
    try{
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')

        if(response.data.length > 0) {
            res.status(200).json({
                message: 'Data dari public API',
                data: response.data
            });
        }else{
            res.status(200).json({
                message: 'tidak ada data',
                data: []
            });
        }
    }catch(err){
        res.status(404).json({
            message: err.message
        })
    }

    // axios({
    //     method: 'get',
    //     url: 'https://jsonplaceholder.typicode.com/posts'
    // })
    // // axios.get('https://jsonplaceholder.typicode.com/posts')
    // .then(function(response) {
    //     res.status(200).json({
    //         message: 'Data dari public API',
    //         data: response.data
    //     });
    // })
    // .catch(function(err) {
    //     res.error(404).json({
    //         message: err.message
    //     })
    // })
}

controller.post = async function(req, res) {
    try{
        const response = await axios({
            method: 'post',
            url: 'https://jsonplaceholder.typicode.com/posts',
            data: {
                title: req.body.title,
                body: req.body.body,
                userId: 1
            }
        })
        
        res.status(201).json({
            message: 'Data dari public API',
            data: response.data
        });
    }catch(err){
        res.status(404).json({
            message: err.message
        })
    }
}

controller.put = async function(req, res) {
    try{
        var id = req.params.id;
        const response = await axios({
            method: 'put',
            url: 'https://jsonplaceholder.typicode.com/posts/'+id,
            data: {
                title: req.body.title,
                body: req.body.body,
                userId: 1
            }
        })
        
        res.status(201).json({
            message: 'Edit Data dari public API',
            data: response.data
        });
    }catch(err){
        res.status(404).json({
            message: err.message
        })
    }
}

controller.delete = async function(req, res) {
    try{
        var id = req.params.id;
        const response = await axios({
            method: 'delete',
            url: 'https://jsonplaceholder.typicode.com/posts/'+id
        })
        
        res.status(201).json({
            message: 'Hapus Data dari public API',
            data: response.data
        });
    }catch(err){
        res.status(404).json({
            message: err.message
        })
    }
}
module.exports = controller