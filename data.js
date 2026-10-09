/* AI-1 Data — Real sections from NPSU/SASTRA Excel */

const PERIODS = [
  {idx:1,start:'08:30',end:'09:30'},{idx:2,start:'09:30',end:'10:30'},
  {idx:3,start:'10:30',end:'10:45'},{idx:4,start:'10:45',end:'11:45'},
  {idx:5,start:'11:45',end:'12:45'},{idx:6,start:'12:45',end:'13:45'},
  {idx:7,start:'13:45',end:'14:40'},{idx:8,start:'14:40',end:'15:35'},
  {idx:9,start:'15:35',end:'16:30'}
];

const SUBJ_PC = {
  MAT:{code:'25BEPHY101',name:'Mathematics I',faculty:''},
  PHY:{code:'25BEPHY102',name:'Engineering Physics',faculty:''},
  DTI:{code:'25BEPHY103',name:'Design Thinking and Innovation',faculty:'IBM faculty'},
  PSC:{code:'25BEPHY104',name:'Problem Solving Using C',faculty:''},
  BEE:{code:'25BEPHY105',name:'Basics of Electrical Engineering',faculty:''},
  CAEG:{code:'25BEPHY106',name:'Computer Aided Engineering Graphics',faculty:''},
  ENG:{code:'25BEPHY107',name:'Communicative English',faculty:'HRD Trainer'},
  IPR:{code:'25BEPHY108',name:'Intellectual Property Rights',faculty:''},
  MATL:{code:'25BEPHY101',name:'Mathematics Lab',faculty:''},
  PHYL:{code:'25BEPHY102',name:'Engineering Physics Lab',faculty:''},
  PSCL:{code:'25BEPHY104',name:'Problem Solving Using C Lab',faculty:''},
  CAEGL:{code:'25BEPHY106',name:'Computer Aided Engg Graphics Lab',faculty:''},
  CAM:{code:'—',name:'Class Advisor Meeting',faculty:''},
  LIB:{code:'—',name:'Library Hours',faculty:''},
  SPORTS:{code:'—',name:'Physical Education',faculty:''}
};

const SUBJ_EC = {
  MAT:{code:'25BEELY101',name:'Mathematics I',faculty:''},
  MES:{code:'25BEELY102',name:'Mechanical Engineering Science',faculty:''},
  RES:{code:'25BEELY103',name:'Renewable Energy Sources',faculty:''},
  PSC:{code:'25BEELY104',name:'Problem Solving Using C',faculty:''},
  BEC:{code:'25BEELY105',name:'Basics of Electronics Engineering',faculty:''},
  ENVS:{code:'25BEELY106',name:'Environmental Science and Engineering',faculty:''},
  ENG:{code:'25BEELY107',name:'Communicative English',faculty:'HRD Trainer'},
  ICN:{code:'25BEELY108',name:'Indian Constitution',faculty:''},
  KAN:{code:'25BEELY109A',name:'Kannada Samskruthi',faculty:''},
  MATL:{code:'25BEELY101',name:'Mathematics Lab',faculty:''},
  PSCL:{code:'25BEELY104',name:'Problem Solving Using C Lab',faculty:''},
  BECL:{code:'25BEELY105',name:'Basics of Electronics Engineering Lab',faculty:''},
  DTI:{code:'25BEELY102',name:'Design Thinking and Innovation',faculty:'IBM faculty'},
  CAM:{code:'—',name:'Class Advisor Meeting',faculty:''},
  LIB:{code:'—',name:'Library Hours',faculty:''},
  SPORTS:{code:'—',name:'Physical Education',faculty:''}
};

function mkPc(advisor, mon, tue, wed, thu, fri) {
  return { advisor, schedule: { MON: mon, TUE: tue, WED: wed, THU: thu, FRI: fri, SAT: [] } };
}
function mkEc(advisor, mon, tue, wed, thu, fri) {
  return { advisor, schedule: { MON: mon, TUE: tue, WED: wed, THU: thu, FRI: fri, SAT: [] } };
}

/* ============================================================
   REAL PC SECTIONS (from your Excel)
   ============================================================ */
const PC = {
  '1CSE01': mkPc('Dr. Ashwini V Bhat',
    [[1,'PSCL','A922/A905'],[4,'MAT','A901'],[5,'PSC','A901'],[7,'DTI','A901'],[8,'BEE','A901'],[9,'CAM','A901']],
    [[1,'PHY','A904'],[2,'CAEG','A904'],[4,'PHYL','A-1008/B1 & A-1020/B2'],[7,'IPR','A903'],[8,'LIB','A903'],[9,'SPORTS','A903']],
    [[1,'BEE','A901'],[2,'DTI','A901'],[4,'PSC','A901'],[5,'MAT','A901'],[7,'MATL','A1007']],
    [[1,'ENG','A901'],[4,'PHY','A901'],[5,'DTI','A901'],[7,'MAT','A901'],[8,'CAEG','A901']],
    [[1,'PSC','A907'],[2,'BEE','A907'],[4,'CAEGL','A1207']]),

  '1CSE02': mkPc('Ms. Shyni V S',
    [[1,'BEE','A903'],[2,'PSC','A903'],[4,'PSCL','A1121']],
    [[1,'DTI','A903'],[2,'PSC','A903'],[4,'BEE','A903'],[5,'PHY','A903'],[7,'PHYL','A-1008/B1 & A-1020/B2']],
    [[1,'CAEG','A903'],[2,'IPR','A903'],[4,'MAT','A903'],[5,'DTI','A903'],[7,'PSC','A903'],[8,'BEE','A903'],[9,'SPORTS','A903']],
    [[1,'MATL','A1007'],[4,'ENG','A903'],[7,'CAEG','A903'],[8,'MAT','A903'],[9,'CAM','A903']],
    [[1,'PHY','A903'],[2,'MAT','A903'],[4,'DTI','A903'],[5,'LIB','A903'],[7,'CAEGL','A1207']]),

  '1CSE03': mkPc('Mrs. Nayana R',
    [[1,'CAEGL','A1207'],[4,'CAEG','A904'],[5,'PSC','A904'],[7,'PSCL','A1121'],[9,'CAM','A1121']],
    [[1,'DTI','A901'],[2,'LIB','A901'],[4,'BEE','A901'],[5,'MAT','A901'],[7,'PHY','A901'],[8,'PSC','A901'],[9,'SPORTS','A901']],
    [[1,'PHYL','A-1008/B1 & A-1020/B2'],[4,'PSC','A904'],[5,'BEE','A904'],[7,'DTI','A901'],[8,'CAEG','A901']],
    [[1,'IPR','A903'],[2,'MAT','A903'],[4,'MATL','A1007'],[7,'ENG','A904']],
    [[1,'MAT','A901'],[2,'DTI','A901'],[4,'BEE','A901'],[5,'PHY','A901']]),

  '1CSE04': mkPc('Mrs. Anitha M',
    [[1,'PSC','A904'],[2,'DTI','A904'],[4,'CAEGL','A1207'],[7,'MAT','A904'],[8,'LIB','A904']],
    [[1,'PSCL','A1121'],[4,'CAEG','A904'],[5,'PHY','A904'],[7,'PSC','A904'],[8,'BEE','A904'],[9,'SPORTS','A904']],
    [[1,'BEE','A904'],[2,'MAT','A904'],[4,'PHYL','A-1008/B1 & A-1020/B2'],[7,'CAEG','A904'],[8,'DTI','A904'],[9,'CAM','A904']],
    [[1,'PHY','A904'],[2,'BEE','A904'],[4,'IPR','A904'],[5,'PSC','A904'],[7,'MATL','A1007']],
    [[1,'ENG','A904'],[4,'MAT','A904'],[5,'DTI','A904']]),

  '1CSE05': mkPc('Dr. Uma S',
    [[1,'PHY','A907'],[2,'IPR','A907'],[4,'PSC','A907'],[5,'BEE','A907'],[7,'CAEGL','A1207']],
    [[1,'DTI','A907'],[2,'PSC','A907'],[4,'PSCL','A922/A905'],[7,'MAT','A907'],[8,'BEE','A907']],
    [[1,'CAEG','A907'],[2,'MAT','A907'],[4,'PHY','A907'],[5,'DTI','A907'],[7,'PHYL','A-1008/B1 & A-1020/B2'],[9,'SPORTS','A907']],
    [[1,'LIB','A907'],[2,'BEE','A907'],[4,'DTI','A907'],[5,'MAT','A907'],[7,'CAEG','A907'],[8,'PSC','A907'],[9,'CAM','A907']],
    [[1,'MATL','A1007'],[4,'ENG','A907']]),

  '1CSE06': mkPc('Mr. Jayanth T S',
    [[1,'ENG','A913'],[4,'BEE','A913'],[5,'MAT','A913'],[7,'PSC','A913'],[8,'DTI','A913']],
    [[1,'CAEGL','A1207'],[4,'PHY','A909'],[5,'BEE','A909'],[7,'PSCL','A922/A905'],[9,'SPORTS','A922/A905']],
    [[1,'IPR','A913'],[2,'MAT','A913'],[4,'DTI','A913'],[5,'PSC','A913'],[7,'CAEG','A913'],[8,'CAM','A913']],
    [[1,'PHYL','A-1008/B1 & A-1020/B2'],[4,'CAEG','A909'],[5,'PHY','A909'],[7,'BEE','A911'],[8,'MAT','A911'],[9,'PSC','A911']],
    [[1,'DTI','A913'],[2,'LIB','A913'],[4,'MATL','A1007']]),

  '1CSE07': mkPc('Mrs. Lakshmi K',
    [[1,'BEE','A909'],[2,'PSC','A909'],[4,'ENG','A909']],
    [[1,'MAT','A909'],[2,'DTI','A909'],[4,'CAEGL','A1207'],[7,'PSC','A909'],[8,'BEE','A909']],
    [[1,'PSCL','A522/A622'],[4,'PHY','A909'],[5,'LIB','A909'],[7,'MAT','A909'],[8,'DTI','A909'],[9,'SPORTS','A909']],
    [[1,'DTI','A909'],[2,'PSC','A909'],[4,'PHYL','A-1008/B1 & A-1020/B2'],[7,'IPR','A909'],[8,'CAEG','A909'],[9,'CAM','A909']],
    [[1,'CAEG','A909'],[2,'PHY','A909'],[4,'MAT','A909'],[5,'BEE','A909'],[7,'MATL','A1007']]),

  '1CSE08': mkPc('Ms. Shruti B P',
    [[1,'MATL','A1007'],[4,'DTI','A911'],[5,'MAT','A911'],[7,'ENG','A911'],[9,'CAM','A911']],
    [[1,'IPR','A911'],[2,'MAT','A911'],[4,'PSC','A911'],[5,'BEE','A911'],[7,'CAEGL','A1207']],
    [[1,'DTI','A911'],[2,'BEE','A911'],[4,'PSCL','A1121'],[7,'PSC','A911'],[8,'LIB','A911'],[9,'SPORTS','A911']],
    [[1,'CAEG','A911'],[2,'PHY','A911'],[4,'MAT','A911'],[5,'DTI','A911'],[7,'PHYL','A-1008/B1 & A-1020/B2']],
    [[1,'BEE','A911'],[2,'PSC','A911'],[4,'PHY','A911'],[5,'CAEG','A911']]),

  '1CSE09': mkPc('Ms. Amrutha D S',
    [[1,'PHY','A911'],[2,'CAEG','A911'],[4,'MATL','A1007'],[7,'MAT','A920'],[8,'PSC','A920'],[9,'CAM','A920']],
    [[1,'ENG','A913'],[4,'MAT','A913'],[5,'DTI','A913'],[7,'BEE','A913'],[8,'PSC','A913'],[9,'SPORTS','A913']],
    [[1,'CAEGL','A1207'],[4,'DTI','A911'],[5,'LIB','A911'],[7,'PSCL','A922/A905']],
    [[1,'BEE','A913'],[2,'MAT','A913'],[4,'DTI','A913'],[5,'PHY','A913'],[7,'CAEG','A913'],[8,'IPR','A913']],
    [[1,'PHYL','A-1008/B1 & A-1020/B2'],[4,'PSC','A913'],[5,'BEE','A913']]),

  '1CSE10': mkPc('Mr. Chethan Kumar D S',
    [[1,'IPR','A920'],[2,'MAT','A920'],[4,'DTI','A920'],[5,'PSC','A920'],[7,'MATL','A1007']],
    [[1,'BEE','A920'],[2,'PHY','A920'],[4,'ENG','A920'],[7,'CAEG','A920'],[8,'MAT','A920']],
    [[1,'DTI','A920'],[2,'PSC','A920'],[4,'CAEGL','A1207'],[7,'BEE','A920'],[8,'LIB','A920'],[9,'SPORTS','A920']],
    [[1,'PSCL','A922/A905'],[4,'MAT','A920'],[5,'BEE','A920'],[7,'DTI','A920'],[8,'PSC','A920'],[9,'CAM','A920']],
    [[1,'PHY','A920'],[2,'CAEG','A920'],[4,'PHYL','A-1008/B1 & A-1020/B2']]),

  '1CSE11': mkPc('Mr. Ashok Gowda M J',
    [[1,'PSC','A923'],[2,'MAT','A923'],[4,'BEE','A923'],[5,'DTI','A923'],[7,'PHY','A923'],[8,'CAEG','A923'],[9,'SPORTS','A923']],
    [[1,'MATL','A1007'],[4,'CAEG','A923'],[5,'PSC','A923'],[7,'ENG','A923'],[9,'CAM','A923']],
    [[1,'MAT','A923'],[2,'DTI','A923'],[4,'IPR','A923'],[5,'BEE','A923'],[7,'CAEGL','A1207']],
    [[1,'LIB','A923'],[2,'PHY','A923'],[4,'PSCL','A522/A622']],
    [[1,'BEE','A923'],[2,'PSC','A923'],[4,'DTI','A923'],[5,'MAT','A923'],[7,'PHYL','A-1008/B1 & A-1020/B2']]),

  '1CSE12': mkPc('Mr. Sangameshwarayya S S',
    [[1,'PHYL','A-1008/B1 & A-1020/B2'],[4,'PHY','A926'],[5,'CAEG','A926'],[7,'BEE','A926'],[8,'DTI','A926']],
    [[1,'PSC','A926'],[2,'DTI','A926'],[4,'MATL','A1007'],[7,'CAEG','A926'],[8,'MAT','A926'],[9,'SPORTS','A926']],
    [[1,'ENG','A926'],[4,'BEE','A926'],[5,'MAT','A926'],[7,'PHY','A926'],[8,'PSC','A926'],[9,'CAM','A926']],
    [[1,'CAEGL','A1207'],[4,'DTI','A926'],[5,'LIB','A926'],[7,'PSCL','A922/A905']],
    [[1,'MAT','A926'],[2,'BEE','A926'],[4,'PSC','A926'],[5,'IPR','A926']]),

  '1CSE13': mkPc('Ms. Rashika R',
    [[1,'CAEG','A1001'],[2,'PSC','A1001'],[4,'PHYL','A-1008/B1 & A-1020/B2'],[7,'DTI','A1001'],[8,'IPR','A1001'],[9,'CAM','A1001']],
    [[1,'MAT','A1001'],[2,'BEE','A1001'],[4,'PSC','A1001'],[5,'DTI','A1001'],[7,'MATL','A1007']],
    [[1,'PSC','A1001'],[2,'PHY','A1001'],[4,'ENG','A1001'],[7,'BEE','A1001'],[8,'DTI','A1001'],[9,'MAT','A1001']],
    [[1,'PHY','A1001'],[2,'CAEG','A1001'],[4,'CAEGL','A1207'],[7,'MAT','A1001'],[8,'SPORTS','A1001']],
    [[1,'PSCL','A1208/A1220'],[4,'BEE','A1003'],[5,'LIB','A1003']]),

  '1CSE14': mkPc('Mrs. Rekha Diana Pais',
    [[1,'PSC','A1003'],[2,'BEE','A1003'],[4,'CAEG','A1003'],[5,'PHY','A1003'],[7,'PHYL','A-1008/B1 & A-1020/B2'],[9,'SPORTS','A1003']],
    [[1,'LIB','A1003'],[2,'PHY','A1003'],[4,'IPR','A1003'],[5,'DTI','A1003'],[7,'MAT','A1003'],[8,'CAM','A1003']],
    [[1,'MATL','A1007'],[4,'BEE','A1003'],[5,'PSC','A1003'],[7,'ENG','A1003'],[9,'MAT','A1003']],
    [[1,'BEE','A1003'],[2,'DTI','A1003'],[4,'PSC','A1003'],[5,'CAEG','A1003'],[7,'CAEGL','A1207']],
    [[1,'DTI','A1003'],[2,'MAT','A1003'],[4,'PSCL','A922/A905']]),

  '1CSE15': mkPc('Ms. Aditi K',
    [[1,'MAT','A926'],[2,'DTI','A926'],[4,'PSC','A1001'],[5,'BEE','A1001']],
    [[1,'PHYL','A-1008/B1 & A-1020/B2'],[4,'MAT','A926'],[5,'CAEG','A926'],[7,'PHY','A1001'],[8,'DTI','A1001']],
    [[1,'PSC','A1003'],[2,'BEE','A1003'],[4,'MATL','A1007'],[7,'MAT','A923'],[8,'IPR','A923'],[9,'CAM','A923']],
    [[1,'ENG','A926'],[4,'BEE','A1001'],[5,'DTI','A1001'],[7,'PSC','A926'],[8,'LIB','A926'],[9,'SPORTS','A926']],
    [[1,'CAEGL','A1207'],[4,'PHY','A1001'],[5,'CAEG','A1001'],[7,'PSCL','A1208/A1220']]),

  '1CSE16': mkPc('Mrs. Nisarga K P',
    [[1,'PSCL','A1208/A1220'],[4,'MAT','A1004'],[5,'PSC','A1004'],[7,'DTI','A1004'],[8,'BEE','A1004'],[9,'PSC','A1004']],
    [[1,'PHY','A1011'],[2,'CAEG','A1011'],[4,'PHYL','A-1108/B1 & A-1120/B2'],[7,'IPR','A1009'],[8,'SPORTS','A1009']],
    [[1,'BEE','A1004'],[2,'DTI','A1004'],[4,'PSC','A1004'],[5,'MAT','A1004'],[7,'MATL','A1021']],
    [[1,'ENG','A1004'],[4,'PHY','A1004'],[5,'CAEG','A1004'],[7,'MAT','A1004'],[8,'DTI','A1004'],[9,'CAM','A1004']],
    [[1,'LIB','A1013'],[2,'BEE','A1013'],[4,'CAEGL','A1221']]),

  '1CSE17': mkPc('Dr. Bhavana H V',
    [[1,'BEE','A1009'],[2,'MAT','A1009'],[4,'PSCL','A922/A905']],
    [[1,'DTI','A1009'],[2,'PSC','A1009'],[4,'PHY','A1009'],[5,'BEE','A1009'],[7,'PHYL','A-1108/B1 & A-1120/B2']],
    [[1,'CAEG','A1009'],[2,'IPR','A1009'],[4,'MAT','A1009'],[5,'DTI','A1009'],[7,'PSC','A1009'],[8,'SPORTS','A1009']],
    [[1,'MATL','A1021'],[4,'ENG','A1009'],[7,'CAEG','A1009'],[8,'BEE','A1009'],[9,'CAM','A1009']],
    [[1,'PHY','A1009'],[2,'MAT','A1009'],[4,'DTI','A1009'],[5,'LIB','A1009'],[7,'CAEGL','A1221']]),

  '1CSE18': mkPc('Ms. Pavithra B',
    [[1,'CAEGL','A1221'],[4,'CAEG','A1011'],[5,'LIB','A1011'],[7,'PSCL','A922/A905'],[9,'PSC','A1009']],
    [[1,'DTI','A1004'],[2,'PSC','A1004'],[4,'BEE','A1004'],[5,'MAT','A1004'],[7,'PHY','A1004'],[8,'SPORTS','A1004']],
    [[1,'PHYL','A-1108/B1 & A-1120/B2'],[4,'PSC','A1011'],[5,'BEE','A1011'],[7,'DTI','A1004'],[8,'CAEG','A1004'],[9,'CAM','A1004']],
    [[1,'IPR','A1009'],[2,'MAT','A1009'],[4,'MATL','A1021'],[7,'ENG','A1011']],
    [[1,'MAT','A1004'],[2,'DTI','A1004'],[4,'BEE','A1004'],[5,'PHY','A1004']]),

  '1CSE19': mkPc('Ms. Varsha',
    [[1,'PSC','A1011'],[2,'DTI','A1011'],[4,'CAEGL','A1221'],[7,'MAT','A1011'],[8,'LIB','A1011']],
    [[1,'PSCL','A922/A905'],[4,'CAEG','A1011'],[5,'BEE','A1011'],[7,'PHY','A1011'],[8,'PSC','A1011'],[9,'SPORTS','A1011']],
    [[1,'BEE','A1011'],[2,'MAT','A1011'],[4,'PHYL','A-1108/B1 & A-1120/B2'],[7,'CAEG','A1011'],[8,'DTI','A1011'],[9,'CAM','A1011']],
    [[1,'PHY','A1011'],[2,'BEE','A1011'],[4,'IPR','A1011'],[5,'PSC','A1011'],[7,'MATL','A1021']],
    [[1,'ENG','A1011'],[4,'MAT','A1011'],[5,'DTI','A1011']]),

  '1CSE20': mkPc('Mrs. Prajwala Y M',
    [[1,'PHY','A1013'],[2,'IPR','A1013'],[4,'PSC','A1013'],[5,'BEE','A1013'],[7,'CAEGL','A1221']],
    [[1,'PSC','A1013'],[2,'DTI','A1013'],[4,'PSCL','A510/A508'],[7,'MAT','A1013'],[8,'BEE','A1013']],
    [[1,'CAEG','A1013'],[2,'MAT','A1013'],[4,'PHY','A1013'],[5,'DTI','A1013'],[7,'PHYL','A-1108/B1 & A-1120/B2'],[9,'SPORTS','A1013']],
    [[1,'PSC','A1013'],[2,'BEE','A1013'],[4,'DTI','A1013'],[5,'MAT','A1013'],[7,'CAEG','A1013'],[8,'CAM','A1013'],[9,'LIB','A1013']],
    [[1,'MATL','A1021'],[4,'ENG','A1013']]),

  '1CSE21': mkPc('Mrs. Monica M S',
    [[1,'ENG','A1101'],[4,'BEE','A1101'],[5,'MAT','A1101'],[7,'DTI','A1101'],[8,'CAM','A1101']],
    [[1,'CAEGL','A1221'],[4,'PHY','A1018'],[5,'BEE','A1018'],[7,'PSCL','A822/A808'],[9,'SPORTS','A822/A808']],
    [[1,'IPR','A1101'],[2,'MAT','A1101'],[4,'DTI','A1101'],[5,'PSC','A1101'],[7,'CAEG','A1101'],[8,'LIB','A1101']],
    [[1,'PHYL','A-1108/B1 & A-1120/B2'],[4,'CAEG','A1018'],[5,'PHY','A1018'],[7,'BEE','A1024'],[8,'MAT','A1024'],[9,'PSC','A1024']],
    [[1,'PSC','A1101'],[2,'DTI','A1101'],[4,'MATL','A1021']]),

  /* -------- YOUR SECTION -------- */
  '1CSE22': mkPc('Mr. Prathap M S',
    [[1,'BEE','A1018'],[2,'PSC','A1018'],[4,'ENG','A1018']],
    [[1,'MAT','A1018'],[2,'DTI','A1018'],[4,'CAEGL','A1221'],[7,'PSC','A1018'],[8,'BEE','A1018']],
    [[1,'PSCL','A1121'],[4,'PHY','A1018'],[5,'DTI','A1018'],[7,'MAT','A1018'],[8,'LIB','A1018'],[9,'SPORTS','A1018']],
    [[1,'DTI','A1018'],[2,'PSC','A1018'],[4,'PHYL','A-1108/B1 & A-1120/B2'],[7,'IPR','A1018'],[8,'CAEG','A1018'],[9,'CAM','A1018']],
    [[1,'CAEG','A1018'],[2,'PHY','A1018'],[4,'MAT','A1018'],[5,'BEE','A1018'],[7,'MATL','A1021']]),

  '1CSE23': mkPc('Dr. Sowmya A',
    [[1,'MATL','A1021'],[4,'DTI','A1024'],[5,'MAT','A1024'],[7,'ENG','A1024'],[9,'SPORTS','A1024']],
    [[1,'IPR','A1024'],[2,'MAT','A1024'],[4,'PSC','A1024'],[5,'BEE','A1024'],[7,'CAEGL','A1221']],
    [[1,'DTI','A1024'],[2,'BEE','A1024'],[4,'PSCL','A922/A905'],[7,'PSC','A1024'],[8,'CAEG','A1024']],
    [[1,'CAEG','A1024'],[2,'PHY','A1024'],[4,'MAT','A1024'],[5,'DTI','A1024'],[7,'PHYL','A-1108/B1 & A-1120/B2'],[9,'CAM','A1024']],
    [[1,'BEE','A1024'],[2,'PSC','A1024'],[4,'PHY','A1024'],[5,'LIB','A1024']]),

  '1CSE24': mkPc('Ms. Pavana S',
    [[1,'PHY','A1024'],[2,'CAEG','A1024'],[4,'MATL','A1021'],[7,'MAT','A1103'],[8,'PSC','A1103']],
    [[1,'ENG','A1101'],[4,'PSC','A1101'],[5,'DTI','A1101'],[7,'BEE','A1101'],[8,'MAT','A1101'],[9,'CAM','A1101']],
    [[1,'CAEGL','A1221'],[4,'DTI','A1024'],[5,'LIB','A1024'],[7,'PSCL','A1107']],
    [[1,'BEE','A1101'],[2,'MAT','A1101'],[4,'CAEG','A1101'],[5,'PHY','A1101'],[7,'DTI','A1101'],[8,'IPR','A1101']],
    [[1,'PHYL','A-1108/B1 & A-1120/B2'],[4,'PSC','A1101'],[5,'BEE','A1101']]),

  '1CSE25': mkPc('Ms. Shravani G M',
    [[1,'LIB','A1103'],[2,'MAT','A1103'],[4,'DTI','A1103'],[5,'PSC','A1103'],[7,'MATL','A1021']],
    [[1,'BEE','A1103'],[2,'PHY','A1103'],[4,'ENG','A1103'],[7,'CAEG','A1103'],[8,'MAT','A1103'],[9,'CAM','A1103']],
    [[1,'DTI','A1103'],[2,'PSC','A1103'],[4,'CAEGL','A1221'],[7,'BEE','A1103'],[9,'SPORTS','A1103']],
    [[1,'PSCL','A510/A508'],[4,'MAT','A1103'],[5,'BEE','A1103'],[7,'DTI','A1103'],[8,'PSC','A1103'],[9,'IPR','A1103']],
    [[1,'PHY','A1103'],[2,'CAEG','A1103'],[4,'PHYL','A-1108/B1 & A-1120/B2']]),

  '1CSE26': mkPc('Ms. Swetha M',
    [[1,'PSC','A1104'],[2,'MAT','A1104'],[4,'BEE','A1104'],[5,'DTI','A1104'],[7,'PHY','A1104'],[8,'CAM','A1104'],[9,'SPORTS','A1104']],
    [[1,'MATL','A1021'],[4,'CAEG','A1104'],[5,'IPR','A1104'],[7,'ENG','A1104'],[9,'LIB','A1104']],
    [[1,'MAT','A1104'],[2,'DTI','A1104'],[4,'PSC','A1104'],[5,'BEE','A1104'],[7,'CAEGL','A1221']],
    [[1,'CAEG','A1104'],[2,'PHY','A1104'],[4,'PSCL','A1208/A1220']],
    [[1,'BEE','A1104'],[2,'PSC','A1104'],[4,'DTI','A1104'],[5,'MAT','A1104'],[7,'PHYL','A-1108/B1 & A-1120/B2']]),

  '1CSE27': mkPc('Ms. Apurva V',
    [[1,'PHYL','A-1108/B1 & A-1120/B2'],[4,'PHY','A1109'],[5,'LIB','A1109'],[7,'BEE','A1109'],[8,'DTI','A1109']],
    [[1,'PSC','A1109'],[2,'DTI','A1109'],[4,'MATL','A1021'],[7,'CAEG','A1109'],[8,'MAT','A1109'],[9,'SPORTS','A1109']],
    [[1,'ENG','A1109'],[4,'BEE','A1109'],[5,'MAT','A1109'],[7,'PHY','A1109'],[8,'CAEG','A1109'],[9,'CAM','A1109']],
    [[1,'CAEGL','A1221'],[4,'DTI','A1109'],[5,'PSC','A1109'],[7,'PSCL','A822/A808']],
    [[1,'MAT','A1109'],[2,'BEE','A1109'],[4,'PSC','A1109'],[5,'IPR','A1109']]),

  '1CSE28': mkPc('Mrs. Thejaswini J N',
    [[1,'CAEG','A1111'],[2,'PSC','A1111'],[4,'PHYL','A-1108/B1 & A-1120/B2'],[7,'DTI','A1111'],[8,'IPR','A1111']],
    [[1,'MAT','A1111'],[2,'BEE','A1111'],[4,'PSC','A1111'],[5,'DTI','A1111'],[7,'MATL','A1021']],
    [[1,'PSC','A1111'],[2,'PHY','A1111'],[4,'ENG','A1111'],[7,'BEE','A1111'],[8,'DTI','A1111'],[9,'CAM','A1111']],
    [[1,'PHY','A1111'],[2,'CAEG','A1111'],[4,'CAEGL','A1221'],[7,'MAT','A1111'],[8,'LIB','A1111'],[9,'SPORTS','A1111']],
    [[1,'PSCL','A922/A905'],[4,'BEE','A1113'],[5,'MAT','A1113']]),

  '1CSE29': mkPc('Mr. Mrutyanjaya Gouda G K',
    [[1,'MAT','A1113'],[2,'BEE','A1113'],[4,'CAEG','A1113'],[5,'PHY','A1113'],[7,'PHYL','A-1108/B1 & A-1120/B2'],[9,'SPORTS','A1113']],
    [[1,'LIB','A1113'],[2,'PHY','A1113'],[4,'IPR','A1113'],[5,'DTI','A1113'],[7,'MAT','A1113'],[8,'PSC','A1113']],
    [[1,'MATL','A1021'],[4,'BEE','A1113'],[5,'PSC','A1113'],[7,'ENG','A1113'],[9,'CAM','A1113']],
    [[1,'BEE','A1113'],[2,'DTI','A1113'],[4,'PSC','A1113'],[5,'SPORTS','A1113'],[7,'CAEGL','A1221']],
    [[1,'DTI','A1113'],[2,'MAT','A1113'],[4,'PSCL','A1208/A1220'],[7,'CAEG','A1113']]),

  '1CSE30': mkPc('Ms. Poornima Jahagirdar',
    [[1,'MAT','A1109'],[2,'DTI','A1109'],[4,'PSC','A1111'],[5,'BEE','A1111']],
    [[1,'PHYL','A-1108/B1 & A-1120/B2'],[4,'MAT','A1109'],[5,'CAEG','A1109'],[7,'PHY','A1111'],[8,'DTI','A1111'],[9,'PSC','A1111']],
    [[1,'LIB','A1113'],[2,'BEE','A1113'],[4,'MATL','A1021'],[7,'MAT','A1104'],[8,'IPR','A1104'],[9,'PSC','A1104']],
    [[1,'ENG','A1109'],[4,'BEE','A1111'],[5,'DTI','A1111'],[7,'CAM','A1109'],[8,'SPORTS','A1109']],
    [[1,'CAEGL','A1221'],[4,'PHY','A1111'],[5,'CAEG','A1111'],[7,'PSCL','A822/A808']]),

  '1CSE31': mkPc('Ms. Hemalatha K',
    [[1,'PSCL','A510/A508'],[4,'MAT','A1118'],[5,'PSC','A1118'],[7,'DTI','A1118'],[8,'BEE','A1118'],[9,'CAM','A1118']],
    [[1,'PHY','A1118'],[2,'CAEG','A1118'],[4,'PHYL','A-1010/B1 & A-1023/B2'],[7,'IPR','A1118'],[8,'LIB','A1118'],[9,'SPORTS','A1118']],
    [[1,'DTI','A1118'],[2,'BEE','A1118'],[4,'PSC','A1118'],[5,'MAT','A1118'],[7,'MATL','A1121']],
    [[1,'ENG','A1118'],[4,'PHY','A1118'],[5,'CAEG','A1118'],[7,'DTI','A1118'],[8,'MAT','A1118']],
    [[1,'PSC','A1118'],[2,'BEE','A1118'],[4,'CAEGL','A1107']]),

  '1CSE32': mkPc('Ms. Shubha D G',
    [[1,'BEE','A1124'],[2,'MAT','A1124'],[4,'PSCL','A522/A622']],
    [[1,'DTI','A1124'],[2,'PSC','A1124'],[4,'BEE','A1124'],[5,'PHY','A1124'],[7,'PHYL','A-1010/B1 & A-1023/B2']],
    [[1,'CAEG','A1124'],[2,'IPR','A1124'],[4,'MAT','A1124'],[5,'LIB','A1124'],[7,'PSC','A1124'],[8,'BEE','A1124'],[9,'SPORTS','A1124']],
    [[1,'MATL','A1121'],[4,'ENG','A1124'],[7,'CAEG','A1124'],[8,'DTI','A1124'],[9,'CAM','A1124']],
    [[1,'PHY','A1124'],[2,'MAT','A1124'],[4,'DTI','A1124'],[5,'PSC','A1124'],[7,'CAEGL','A1107']]),

  '1CSE33': mkPc('Ms. Vyshnavi M K',
    [[1,'CAEGL','A1107'],[4,'DTI','B1203'],[5,'PSC','B1203'],[7,'PSCL','A1208/A1220']],
    [[1,'CAEG','B1210'],[2,'PSC','B1210'],[4,'BEE','B1210'],[5,'MAT','B1210'],[7,'PHY','B1210'],[8,'LIB','B1210'],[9,'SPORTS','B1210']],
    [[1,'PHYL','A-1010/B1 & A-1023/B2'],[4,'PSC','B1203'],[5,'BEE','B1203'],[7,'CAEG','B1203'],[8,'DTI','B1203'],[9,'CAM','B1203']],
    [[1,'IPR','B1210'],[2,'MAT','B1210'],[4,'MATL','A1121'],[7,'ENG','B1203']],
    [[1,'MAT','B1210'],[2,'DTI','B1210'],[4,'BEE','B1210'],[5,'PHY','B1210']]),

  '1CSE34': mkPc('Mrs. Soorya M S',
    [[1,'PSC','B1203'],[2,'DTI','B1203'],[4,'CAEGL','A1107'],[7,'MAT','B1203'],[9,'CAM','B1203']],
    [[1,'PSCL','A1208/A1220'],[4,'CAEG','B1205'],[5,'PHY','B1205'],[7,'BEE','B1210'],[8,'PSC','B1210']],
    [[1,'BEE','B1203'],[2,'MAT','B1203'],[4,'LIB','B1205'],[5,'SPORTS','B1205'],[7,'CAEG','B1205'],[8,'DTI','B1205']],
    [[1,'PHY','B1203'],[2,'PSC','B1203'],[4,'IPR','B1203'],[5,'BEE','B1203'],[7,'MATL','A1107']],
    [[1,'ENG','B1203'],[4,'MAT','B1203'],[5,'DTI','B1203'],[7,'PHYL','A-1010/B1 & A-1023/B2']]),

  '1CSE35': mkPc('Mrs. Rakshitha S D',
    [[1,'PHY','B1205'],[2,'IPR','B1205'],[4,'PSC','B1205'],[5,'BEE','B1205'],[7,'CAEGL','A1107']],
    [[1,'PSC','B1205'],[2,'CAEG','B1205'],[4,'PSCL','A423'],[7,'MAT','B1205'],[8,'BEE','B1205'],[9,'CAM','B1205']],
    [[1,'CAEG','B1205'],[2,'PHY','B1205'],[4,'MAT','B1205'],[5,'DTI','B1205'],[7,'PHYL','A-1010/B1 & A-1023/B2']],
    [[1,'DTI','B1205'],[2,'DTI','B1205'],[4,'PSC','B1205'],[5,'MAT','B1205'],[7,'BEE','B1205'],[8,'LIB','B1205'],[9,'SPORTS','B1205']],
    [[1,'MATL','B1207'],[4,'ENG','B1205']]),

  '1CSE36': mkPc('Mr. Darshan S',
    [[1,'ENG','B1210'],[4,'BEE','B1210'],[5,'MAT','B1210'],[7,'PSC','B1210'],[8,'DTI','B1210']],
    [[1,'CAEGL','A1107'],[4,'PHY','B1212'],[5,'BEE','B1212'],[7,'PSCL','A1121'],[9,'SPORTS','A1121']],
    [[1,'IPR','B1210'],[2,'MAT','B1210'],[4,'DTI','B1210'],[5,'PSC','B1210'],[7,'CAEG','B1210'],[8,'DTI','B1210'],[9,'CAM','B1210']],
    [[1,'PHYL','A-1010/B1 & A-1023/B2'],[4,'CAEG','B1210'],[5,'PHY','B1210'],[7,'BEE','B1210'],[8,'LIB','B1210']],
    [[1,'PSC','B1205'],[2,'MAT','B1205'],[4,'MATL','A1121']]),

  '1CSE37': mkPc('Ms. Nagarathna',
    [[1,'BEE','B1212'],[2,'MAT','B1212'],[4,'ENG','B1212'],[7,'CAEG','B1212'],[8,'CAEG','B1212']],
    [[1,'PSC','B1212'],[2,'DTI','B1212'],[4,'CAEGL','A1107'],[7,'BEE','B1212'],[8,'MAT','B1212'],[9,'CAM','B1212']],
    [[1,'PSCL','A1208/A1220'],[4,'PHY','B1212'],[5,'DTI','B1212'],[7,'PSC','B1212'],[8,'LIB','B1212'],[9,'SPORTS','B1212']],
    [[1,'DTI','B1212'],[2,'PSC','B1212'],[4,'PHY','B1212'],[5,'IPR','B1212']],
    [[1,'PHYL','A-1010/B1 & A-1023/B2'],[4,'MAT','B1212'],[5,'BEE','B1212'],[7,'MATL','A1121']]),

  '1CSE38': mkPc('Mrs. Sangeetha Manohar',
    [[1,'MATL','A1121'],[4,'DTI','B1215'],[5,'MAT','B1215'],[7,'ENG','B1215'],[9,'CAM','B1215']],
    [[1,'IPR','B1215'],[2,'MAT','B1215'],[4,'PSC','B1215'],[5,'BEE','B1215'],[7,'CAEGL','A1107'],[9,'LIB','A1107']],
    [[1,'DTI','B1215'],[2,'BEE','B1215'],[4,'PSCL','A1107'],[7,'DTI','B1215'],[8,'SPORTS','B1215']],
    [[1,'CAEG','B1215'],[2,'PHY','B1215'],[4,'MAT','B1215'],[5,'PSC','B1215'],[7,'PHYL','A-1010/B1 & A-1023/B2']],
    [[1,'BEE','B1215'],[2,'PSC','B1215'],[4,'PHY','B1215'],[5,'CAEG','B1215']])
};

/* ============================================================
   REAL EC SECTIONS
   ============================================================ */
const EC = {
  '1CSE39': mkEc('Ms. Kusuma',
    [[1,'BEC','A1213'],[2,'PSC','A1213'],[4,'BECL','A201/A204'],[7,'MAT','A1213'],[8,'KAN','A1213']],
    [[1,'ENG','A1213'],[4,'RES','A1213'],[5,'DTI','A1213'],[7,'PSCL','A1208/A1220']],
    [[1,'RES','A1213'],[2,'PSC','A1213'],[4,'LIB','A1213'],[5,'SPORTS','A1213'],[7,'MAT','A1213']],
    [[1,'ICN','A1213'],[2,'DTI','A1213'],[4,'RES','A1213'],[5,'MAT','A1213'],[7,'BEC','A1213'],[8,'PSC','A1213'],[9,'CAM','A1213']],
    [[1,'MATL','A1107'],[4,'DTI','A1213'],[5,'ENVS','A1213']]),

  '1CSE40': mkEc('Mr. Srinivas Rao',
    [[1,'PSC','A1218'],[2,'ENVS','A1218'],[4,'DTI','A1218'],[5,'RES','A1218'],[7,'BECL','A201/A204']],
    [[1,'BEC','A1218'],[2,'PSC','A1218'],[4,'PSCL','A1208/A1220'],[7,'MAT','A1218'],[8,'CAM','A1218']],
    [[1,'MATL','A1210/A1223'],[4,'MAT','A1218'],[5,'SPORTS','A1218'],[7,'ENG','A1218'],[9,'RES','A1218']],
    [[1,'MAT','A1218'],[2,'LIB','A1218'],[4,'BEC','A1218'],[5,'DTI','A1218'],[7,'RES','A1218']],
    [[1,'PSC','A1218'],[2,'DTI','A1218'],[4,'KAN','A1218'],[5,'ICN','A1218']]),

  '1CSE41': mkEc('Dr. Rajiv S R',
    [[1,'LIB','A1224'],[2,'MAT','A1224'],[4,'PSCL','A1208/A1220'],[7,'RES','A1224'],[8,'PSC','A1224'],[9,'CAM','A1224']],
    [[1,'RES','A1224'],[2,'KAN','A1224'],[4,'PSC','A1224'],[5,'BEC','A1224'],[7,'ENVS','A1224'],[8,'DTI','A1224'],[9,'SPORTS','A1224']],
    [[1,'BEC','A1224'],[2,'RES','A1224'],[4,'MAT','A1224'],[5,'DTI','A1224']],
    [[1,'MATL','A1107'],[4,'DTI','A1224'],[5,'PSC','A1224'],[7,'ENG','A1224']],
    [[1,'BECL','A425/A1005'],[4,'ICN','A1224'],[5,'MAT','A1224']]),

  '1CSE42': mkEc('Mr. Lakshminarayana K S',
    [[1,'RES','A1118'],[2,'BEC','A1118'],[4,'MAT','A1213'],[5,'ENVS','A1213']],
    [[1,'MAT','A1104'],[2,'PSC','A1104'],[4,'MATL','A1121'],[7,'DTI','A1213'],[8,'RES','A1213'],[9,'CAM','A1213']],
    [[1,'ICN','A1218'],[2,'KAN','A1218'],[4,'DTI','A1103'],[5,'MAT','A1103'],[7,'BEC','A1224'],[8,'PSC','A1224'],[9,'SPORTS','A1224']],
    [[1,'BECL','A425/A1005'],[4,'PSC','A1104'],[5,'LIB','A1104']],
    [[1,'DTI','A1224'],[2,'RES','A1224'],[4,'PSCL','A423'],[7,'ENG','A1224']]),

  '1ADS01': mkEc('Mrs. Varalakshmi S S',
    [[1,'PSCL','B801/B908'],[4,'MAT','B903'],[5,'LIB','B903']],
    [[1,'ENVS','B903'],[2,'PSC','B903'],[4,'RES','B903'],[5,'BEC','B903'],[7,'MES','B903'],[8,'MAT','B903'],[9,'CAM','B903']],
    [[1,'ENG','B903'],[4,'MATL','B801/B908'],[7,'MAT','B903'],[8,'PSC','B903'],[9,'SPORTS','B903']],
    [[1,'MES','B903'],[2,'RES','B903'],[4,'PSC','B903'],[5,'ICN','B903'],[7,'BECL','A201/A204']],
    [[1,'BEC','B903'],[2,'MES','B903'],[4,'KAN','B903'],[5,'RES','B903']]),

  '1ADS02': mkEc('Mr. Shivakumar E',
    [[1,'RES','B905'],[2,'MAT','B905'],[4,'PSCL','B801/B908'],[7,'PSC','B905'],[8,'CAM','B905']],
    [[1,'BEC','B905'],[2,'MES','B905'],[4,'KAN','B905'],[5,'PSC','B905'],[7,'MAT','B905'],[8,'RES','B905'],[9,'LIB','B905']],
    [[1,'ICN','B905'],[2,'MES','B905'],[4,'ENG','B905'],[7,'MATL','B908/A1220'],[9,'SPORTS','B905']],
    [[1,'PSC','B905'],[2,'ENVS','B905'],[4,'RES','B905'],[5,'MAT','B905']],
    [[1,'BECL','A201/A204'],[4,'MES','B905'],[5,'BEC','B905']]),

  '1ADS03': mkEc('Mr. Raghavendra N',
    [[1,'MAT','B907'],[2,'KAN','B907'],[4,'BEC','B907'],[5,'MES','B907'],[7,'PSCL','B801/B908']],
    [[1,'RES','B907'],[2,'BEC','B907'],[4,'ICN','B907'],[5,'MAT','B907'],[7,'PSC','B907'],[8,'CAM','B907'],[9,'LIB','B907']],
    [[1,'MAT','B907'],[2,'PSC','B907'],[4,'MES','B907'],[5,'RES','B907'],[7,'ENG','B907'],[9,'SPORTS','B907']],
    [[1,'MATL','B908/A1220'],[4,'MES','B907'],[5,'PSC','B907']],
    [[1,'ENVS','B907'],[2,'RES','B907'],[4,'BECL','A201/A204']]),

  '1ADS04': mkEc('Mrs. Tejaswini N S',
    [[1,'PSC','B910'],[2,'MES','B910'],[4,'ICN','B910'],[5,'MAT','B910']],
    [[1,'PSCL','B801/B908'],[4,'ENVS','B910'],[5,'BEC','B910'],[7,'RES','B910'],[8,'KAN','B910'],[9,'LIB','B910']],
    [[1,'BEC','B910'],[2,'RES','B910'],[4,'PSC','B910'],[5,'MES','B910']],
    [[1,'ENG','B910'],[4,'MATL','B801/B908'],[7,'MAT','B910'],[8,'CAM','B910'],[9,'SPORTS','B910']],
    [[1,'MES','B910'],[2,'MAT','B910'],[4,'RES','B910'],[5,'PSC','B910'],[7,'BECL','A201/A204']]),

  '1ADS05': mkEc('Ms. Ashwini R',
    [[1,'BECL','A201/A204'],[4,'MES','B912'],[5,'PSC','B912'],[7,'RES','B912'],[8,'MAT','B912'],[9,'LIB','B912']],
    [[1,'MES','B912'],[2,'RES','B912'],[4,'PSCL','B801/B908']],
    [[1,'ENVS','B912'],[2,'RES','B912'],[4,'MAT','B912'],[5,'KAN','B912'],[7,'MES','B912'],[8,'SPORTS','B912']],
    [[1,'BEC','B912'],[2,'PSC','B912'],[4,'ENG','B912'],[7,'MATL','B801/B908'],[9,'CAM','B912']],
    [[1,'PSC','B912'],[2,'ICN','B912'],[4,'BEC','B912'],[5,'MAT','B912']]),

  /* Remaining EC sections — templated until you upload their data */
  ...(['1DAS01','1DAS02','1DAS03','1DAS04','1DAS05','1DAS06','1DAS07','1DAS08',
      '1AML01','1AML02','1AML03','1AML04','1AML05','1AML06','1AML07','1AML08',
      '1AML09','1AML10','1AML11','1AML12','1AML13','1AML14',
      '1ECE01','1ECE02','1ECE03','1ECE04','1ECE05',
      '1EEE01'].reduce((acc,code)=>{
    acc[code]=mkEc('Faculty In-Charge',
      [[1,'BEC','B903'],[4,'MAT','B903'],[7,'RES','B903']],
      [[1,'MES','B905'],[2,'PSC','B905'],[4,'MATL','Lab']],
      [[1,'RES','B905'],[2,'MAT','B905'],[4,'ENVS','B905']],
      [[1,'ICN','B903'],[4,'BEC','B903'],[7,'PSC','B903']],
      [[1,'ENG','B903'],[4,'KAN','B903'],[5,'DTI','B903']]);
    return acc;
  },{}))
};

const MERGED = {...PC,...EC};
const SECTIONS = {};
Object.keys(MERGED).forEach(code=>{
  const isEC = code.startsWith('1ECE')||code.startsWith('1ADS')||code.startsWith('1DAS')
    ||code.startsWith('1AML')||code.startsWith('1EEE')
    ||(code.startsWith('1CSE')&&parseInt(code.slice(4),10)>38);
  const e = MERGED[code];
  SECTIONS[code]={
    code, cycle:isEC?'EC':'PC', advisor:e.advisor, periods:PERIODS,
    subjects:isEC?SUBJ_EC:SUBJ_PC,
    schedule:Object.fromEntries(Object.entries(e.schedule).map(([d,l])=>[d,l.map(([p,s,r])=>({period:p,subject:s,room:r}))]))
  };
});

window.AI1_DATA = { sections:SECTIONS, allSectionCodes:Object.keys(SECTIONS), periods:PERIODS };