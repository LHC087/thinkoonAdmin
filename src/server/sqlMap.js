// sqlmap.js
var sqlMap = {
  //官网接口
  gwindex: {
    searchBanner: 'select * from banner where invaild = 0 and type = 0 order by order_num,banner_id',
    searchBjBanner: 'select * from banner where invaild = 0 and type = 1 order by order_num,banner_id',
    searchResource: 'select * from resource_matrix where invaild = 0 and type = 0 order by order_num,resource_id',
    searchResourceDetails: 'select * from resource_matrix where species = ? and invaild = 0 and type = 1 order by order_num,resource_id',
    searchCase: 'select * from marketing_case where invaild = 0 order by order_num,marketing_id',
    searchRed: 'select * from red_recruiting where type = 0 order by reds_id',
    searchRedDetails: 'select * from red_recruiting where type = 1 order by reds_id',
    searchContant: 'select * from contanct_us where invaild = 0 order by id'
  },

  //后台接口
  // banner
  banner: {
    search: 'select * from banner where concat(banner_img_url,order_num) like "%" ? "%"',
    searchAll: 'select * from banner order by order_num,banner_id',
    add: 'insert into banner(type,banner_img_url, order_num, invaild) values (?, ?, ?, ?)',
    delete: 'delete from banner where banner_id = ?',
    update: 'update banner set type = ?, banner_img_url = ?,order_num = ?,invaild = ? where banner_id = ?',
    changeInvaild: 'update banner set invaild = ? where banner_id = ?'
  },
  //resourceMatrix
  resourceMatrix: {
    search: 'select * from resource_matrix where concat(resource_name,resource_img_url,resource_desc,resource_relate_url,order_num) like "%" ? "%"',
    searchAll: 'select * from resource_matrix order by order_num,resource_id',
    add: 'insert into resource_matrix(type,species,resource_name,resource_img_url,resource_desc,resource_relate_url,order_num,invaild) values (?, ?, ?, ?, ?, ?, ?, ?)',
    delete: 'delete from resource_matrix where resource_id = ?',
    update: 'update resource_matrix set type = ?,species = ?,resource_name = ?,resource_img_url = ?,resource_desc = ?,resource_relate_url = ?,order_num = ?,invaild = ? where resource_id = ?',
    changeInvaild: 'update resource_matrix set invaild = ? where resource_id = ?'
  },

  // marketingCase
  marketingCase: {
    search: 'select * from marketing_case where concat(marketing_title,marketing_img_url,marketing_tags,resource_relate_url,order_num) like "%" ? "%"',
    searchAll: 'select * from marketing_case order by order_num,marketing_id',
    add: 'insert into marketing_case(marketing_title,marketing_img_url,marketing_tags,resource_relate_url,order_num,invaild) values (?, ?, ?, ?, ?, ?)',
    delete: 'delete from marketing_case where marketing_id = ?',
    update: 'update marketing_case set marketing_title = ?,marketing_img_url = ?,marketing_tags = ?,resource_relate_url = ?,order_num = ?,invaild = ? where marketing_id = ?',
    changeInvaild: 'update marketing_case set invaild = ? where marketing_id = ?'
  },

  // redRecruiting
  redRecruiting: {
    search: 'select * from red_recruiting where concat(reds_img_url,reds_relate_url) like "%" ? "%"',
    searchAll: 'select * from red_recruiting order by reds_id',
    add: 'insert into red_recruiting(type, reds_img_url, reds_relate_url) values (?, ?, ?)',
    delete: 'delete from red_recruiting where reds_id = ?',
    update: 'update red_recruiting set type = ?, reds_img_url = ?,reds_relate_url = ? where reds_id = ?',
  },
  // contanctUs
  contanctUs: {
    search: 'select * from contanct_us where concat(company_name,telphone,area1,area2,area3) like "%" ? "%"',
    searchAll: 'select * from contanct_us order by id',
    add: 'insert into contanct_us(company_name, telphone, area1, area2, area3, business_weixin_url,red_weixin_url,invaild) values (?, ?, ?,?,?,?,?,?)',
    delete: 'delete from contanct_us where id = ?',
    update: 'update contanct_us set company_name = ?,telphone = ?,area1 = ?,area2 = ?,area3 = ?,business_weixin_url = ?,red_weixin_url = ?,invaild = ? where id = ?',
    changeInvaild: 'update contanct_us set invaild = ? where id = ?'
  },
}
module.exports = sqlMap
