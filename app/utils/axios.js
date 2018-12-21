import axios from 'axios';

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

// axios.defaults.headers.common = {
//     'X-Requested-With': 'XMLHttpRequest',
//     'X-CSRF-TOKEN' : window.csrftoken
// };
// // axios.create({
// //     headers: { 'X-CSRFToken': getCookie('csrftoken') }
// //   });
export default axios;
