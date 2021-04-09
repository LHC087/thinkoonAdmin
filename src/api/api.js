import {
  get,
  post,
  del,
  put,
  postfile
}
from '@/utils/request'
//官网页面接口
//Banner组件
export const getGWBannerList = p => get('/gw/getGWBannerList', p);
export const getGWBjBannerList = p => get('/gw/getGWBjBannerList', p);
export const getGWResourceList = p => get('/gw/getGWResourceList', p);
export const getGWResourceDetailsList = p => get('/gw/getGWResourceDetailsList', p);
export const getGWCase = p => get('/gw/getGWCase', p);
export const getGWRed = p => get('/gw/getGWRed', p);
export const getGWRedDetails = p => get('/gw/getGWRedDetails', p);
export const getGWContant = p => get('/gw/getGWContant', p);



//后台页面接口
//Login页面登录接口
export const postLogin = p => post('/login', p);
//Banner页面接口
export const selectBanner = p => get('/banner/selectBanner', p);
export const getBannerList = p => get('/banner/getBannerList', p);
export const addBanner = p => post('/banner/addBanner', p);
export const updateBanner = p => put('/banner/updateBanner', p);
export const deleteBanner = p => post('/banner/deleteBanner', p);
export const changeBannerInvaild = p => put('/banner/changeBannerInvaild', p);

// ResourceMatrix页面接口
export const selectResourceMatrix = p => get('/resourceMatrix/selectResourceMatrix', p);
export const getResourceMatrixList = p => get('/resourceMatrix/getResourceMatrixList', p);
export const addResourceMatrix = p => post('/resourceMatrix/addResourceMatrix', p);
export const updateResourceMatrix = p => put('/resourceMatrix/updateResourceMatrix', p);
export const deleteResourceMatrix = p => post('/resourceMatrix/deleteResourceMatrix', p);
export const changeResourceMatrixInvaild = p => put('/resourceMatrix/changeResourceMatrixInvaild', p);

// MarketingCase页面接口
export const selectMarketingCase = p => get('/marketingCase/selectMarketingCase', p);
export const getMarketingCaseList = p => get('/marketingCase/getMarketingCaseList', p);
export const addMarketingCase = p => post('/marketingCase/addMarketingCase', p);
export const updateMarketingCase = p => put('/marketingCase/updateMarketingCase', p);
export const deleteMarketingCase = p => post('/marketingCase/deleteMarketingCase', p);
export const changeMarketingCaseInvaild = p => put('/marketingCase/changeMarketingCaseInvaild', p);

// RedRecruiting页面接口
export const selectRedRecruiting = p => get('/redRecruiting/selectRedRecruiting', p);
export const getRedRecruitingList = p => get('/redRecruiting/getRedRecruitingList', p);
export const addRedRecruiting = p => post('/redRecruiting/addRedRecruiting', p);
export const updateRedRecruiting = p => put('/redRecruiting/updateRedRecruiting', p);
export const deleteRedRecruiting = p => post('/redRecruiting/deleteRedRecruiting', p);

//ContanctUs页面接口
export const selectContanctUs = p => get('/contanctUs/selectContanctUs', p);
export const getContanctUsList = p => get('/contanctUs/getContanctUsList', p);
export const addContanctUs = p => post('/contanctUs/addContanctUs', p);
export const updateContanctUs = p => put('/contanctUs/updateContanctUs', p);
export const deleteContanctUs = p => post('/contanctUs/deleteContanctUs', p);
export const changeContanctUsInvaild = p => put('/contanctUs/changeContanctUsInvaild', p);
