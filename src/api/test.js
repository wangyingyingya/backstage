// import axios from '@/utils/request'
import request from '@/utils/request'

//  /dev-api  http://mengxuegu.com:7300/mock/5f1e7b10fd3cdf57cd05bb76
const BASE_URI=process.env.VUE_APP_BASE_API

// request.get('/db.json').then(response => {
//     console.log(response.data)
// })

request({
    method: 'get',
    // url:BASE_URI+'/db.json'
    url:'/db.json'
    
}).then(response => {
    console.log('get2', response.data)
})



export default {
    getList() {
        const req = request({
            method: 'get',
            // url:BASE_URI+'/db.json'
            url:'/db.json'
        })
        return req
    }
}
