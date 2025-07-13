import jwt from 'jsonwebtoken'

// psikolog authentication middleware
const authPsikolog = async (req, res, next) => {
    try{

        const pToken = req.headers['ptoken'];

        if (!pToken) {
            return res.json({success:false, message:'Not Authorized'})
        }
        const token_decode = jwt.verify(pToken, process.env.JWT_SECRET)
        req.psikologId = token_decode.id
        next()

    }catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export default authPsikolog