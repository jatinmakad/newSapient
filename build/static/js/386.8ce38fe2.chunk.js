"use strict";(self.webpackChunksap_data_management_microservice=self.webpackChunksap_data_management_microservice||[]).push([[386],{3683:function(e,n,r){r.d(n,{Z:function(){return x}});var t=r(885),a=r(2791),i=r(6151),l=r(5574),s=r(7123),c=r(9157),o=r(5661),d=r(9218),u=r(768),h=r(5975),f=r(184);function x(e){var n=e.open,r=e.handleClose,x=e.id,m=e.data,p=e.dispatch,g=a.useState(""),Z=(0,t.Z)(g,2),v=Z[0],j=Z[1];return(0,f.jsx)("div",{children:(0,f.jsxs)(l.Z,{open:n,onClose:r,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",fullWidth:!0,children:[(0,f.jsx)(o.Z,{id:"alert-dialog-title",children:"Add Comment"}),(0,f.jsx)(c.Z,{children:(0,f.jsx)(d.Z,{style:{textAlign:"left"},hintText:"Message Field",fullWidth:!0,placeholder:"Add Comment",floatingLabelText:"MultiLine and FloatingLabel",multiline:!0,rows:4,value:v,onChange:function(e){return j(e.target.value)}})}),(0,f.jsxs)(s.Z,{children:[(0,f.jsx)(i.Z,{onClick:function(){if(""===v)(0,u.Z)("Please Enter Comment","error");else{var e={comment:v,userId:x,uniqueJobId:m.uniqueJobId,currentJobHoldingTeam:m.currentJobHoldingTeam};p((0,h.Ae)(e));var n={userId:x,uniqueJobId:m.uniqueJobId,currentJobHolder:m.entryHandledBy};p((0,h.eO)(n))}},variant:"contained",color:"info",children:"Add"}),(0,f.jsx)(i.Z,{onClick:r,variant:"contained",color:"error",children:"Cancel"})]})]})})}},2e3:function(e,n,r){var t=r(9218),a=(r(2791),r(184));n.Z=function(e){var n=e.heading,r=e.value,i=e.name,l=e.handleChange,s=e.error,c=e.helperText,o=e.type;return(0,a.jsxs)("div",{className:"flex flex-col justify-start",children:[(0,a.jsx)("p",{className:"text-sm mb-2",children:n}),(0,a.jsx)(t.Z,{fullWidth:!0,placeholder:n,name:i,type:o,value:r,size:"small",multiline:!0,onChange:l,error:s,style:{background:"white"},helperText:c})]})}},7496:function(e,n,r){r(2791);var t=r(184);n.Z=function(e){e.category;var n=e.title;return(0,t.jsx)("div",{className:"mb-10",children:(0,t.jsx)("p",{className:"text-3xl font-extrabold tracking-tight mb-5 text-slate-900",children:n})})}},8038:function(e,n,r){var t=r(1889),a=r(9218),i=r(6151),l=(r(2791),r(184));n.Z=function(e){var n=e.setSearchInput,r=e.searchInput,s=e.children,c=e.Func;return(0,l.jsxs)(t.ZP,{lg:12,container:!0,justifyContent:"space-between",spacing:2,mb:2,children:[(0,l.jsx)(t.ZP,{item:!0,lg:6,md:6,xs:12,sm:12,children:(0,l.jsx)(a.Z,{variant:"standard",fullWidth:!0,placeholder:"Search Ref no. / Insurer / City",value:r,onChange:function(e){return n(e.target.value)},sx:{background:"#fff",padding:"7px 10px",border:"1px solid lightgray",borderRadius:"5px"},size:"small",InputProps:{disableUnderline:!0}})}),(0,l.jsxs)(t.ZP,{item:!0,lg:3,md:3,xs:6,sm:6,children:[(0,l.jsx)(i.Z,{variant:"contained",color:"primary",onClick:function(){return c("search")},size:"large",sx:{marginRight:"5px"},children:"Search"}),(0,l.jsx)(i.Z,{variant:"contained",color:"success",onClick:function(){return c("reset")},size:"large",children:"Reset"})]}),s]})}},8434:function(e,n,r){r.d(n,{Z:function(){return m}});var t=r(4942),a=(r(2791),r(8900)),i=r(9836),l=r(8745),s=r(618),c=r(9281),o=r(8582),d=r(4515),u=r(5855),h=r(703),f=r(6890),x=r(184);function m(e){var n=e.headerCell,r=e.page,t=e.setPage,a=e.rowsPerPage,l=(e.setRowsPerPage,e.data),s=e.children;return(0,x.jsx)(c.Z,{component:h.Z,children:(0,x.jsxs)(i.Z,{sx:{minWidth:650},"aria-label":"custom pagination table",children:[(0,x.jsx)(f.Z,{children:(0,x.jsx)(u.Z,{children:n.map((function(e){return(0,x.jsx)(p,{align:e.align,children:e.value})}))})}),s,(0,x.jsx)(o.Z,{children:(0,x.jsx)(u.Z,{children:(0,x.jsx)(d.Z,{rowsPerPageOptions:"",colSpan:9,count:l,rowsPerPage:a,page:r,onPageChange:function(e,n){t(n)}})})})]})})}var p=(0,a.ZP)(l.Z)((function(e){var n;e.theme;return n={},(0,t.Z)(n,"&.".concat(s.Z.head),{backgroundColor:"#03C9D7",color:"white"}),(0,t.Z)(n,"&.".concat(s.Z.body),{fontSize:14}),n}))},7386:function(e,n,r){r.r(n),r.d(n,{default:function(){return G}});var t=r(885),a=r(2791),i=r(8038),l=r(6030),s=r(6871),c=r(7496),o=r(4245),d=r(2756),u=r(1413),h=r(4942),f=r(3504),x=r(3382),m=r(132),p=r(6151),g=r(1889),Z=r(9218),v=r(8745),j=r(618),b=r(5855),C=r(8900),S=r(8406),P=r(9891),N=r(5574),R=r(2e3),y=r(5705),I=r(7123),k=r(9157),w=r(5661),O=r(5193),T=r(3967),D=r(653),A=r(7751),q=r(3915),E=r(2426),J=r.n(E),_=r(3896),U=r(8434),W=r(3683),z=r(959),F=r(184),M=function(e){e.searchInput;var n=e.page,r=e.setPage,i=e.rowsPerPage,c=e.setRowsPerPage,d=(0,l.I0)(),u=(0,s.s0)(),h=(0,l.v9)((function(e){return e.Login})),m=h.isAuth,p=h.admin,g=(0,l.v9)((function(e){return e.Entry.get})),Z=g.entry,v=g.isLoading,j=(0,l.v9)((function(e){return e.Entry.updateStatus})).updateStatusSuccess,C=(0,l.v9)((function(e){return e.Report.assignTask})).updateAssignTaskSuccess,S=a.useState(!1),P=(0,t.Z)(S,2),N=P[0],R=P[1],y=a.useState(""),I=(0,t.Z)(y,2),k=I[0],w=(I[1],a.useState(!1)),O=(0,t.Z)(w,2),T=O[0],D=O[1],A=a.useState(""),q=(0,t.Z)(A,2),E=q[0],z=q[1];(0,a.useEffect)((function(){!1===m&&u("/login"),j&&R(!1),C&&D(!1)}),[m,j,C]);var M=a.useState(!1),V=(0,t.Z)(M,2),G=V[0],Y=V[1],K=a.useState(""),Q=(0,t.Z)(K,2),$=Q[0],ee=Q[1];return m&&Z.data?v?(0,F.jsx)(o.Z,{}):Z.data&&!Z.data.length?(0,F.jsx)("div",{className:"w-full flex justify-center items-center",children:(0,F.jsx)("img",{src:_,className:"w-1/2"})}):(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(U.Z,{headerCell:B,data:Z.total,page:n,setPage:r,rowsPerPage:i,setRowsPerPage:c,children:(0,F.jsx)(x.Z,{children:(Z.data&&Z.data).map((function(e,n){return console.log(e,"row"),(0,F.jsxs)(b.Z,{sx:{border:"none"},children:[(0,F.jsx)(H,{component:"th",scope:"row",children:n+1}),(0,F.jsx)(H,{align:"left",children:e.reportRefrenceNo}),(0,F.jsx)(H,{align:"left",children:J()(e.date).format("L")}),(0,F.jsx)(H,{align:"left",children:e.finalScannedReport?(0,F.jsx)("a",{href:e.finalScannedReport,target:"_blank",className:"text-blue-800 cursor-pointer",children:"Download"}):(0,F.jsx)("p",{children:"---"})}),(0,F.jsx)(H,{align:"left",children:(0,F.jsx)("div",{className:"flex justify-start items-left",children:"DISPATCH TEAM"!==e.currentJobHoldingTeam?"DONE BY ACOUNT TEAM":(0,F.jsxs)(F.Fragment,{children:["ACCOUNT TEAM"==e.currentJobHoldingTeam?"":(0,F.jsx)("p",{onClick:function(){return function(e){D(!0),z(e)}(e)},className:"text-blue-600 cursor-pointer mr-2",children:"Courier Details"}),(0,F.jsx)(f.rU,{to:"/entry-details/".concat(e._id),children:(0,F.jsx)("p",{className:"text-blue-600 flex justify-center w-full cursor-pointer",children:"View More"})})]})})})]})}))})}),(0,F.jsx)(L,{open:N,admin:p,handleClose:function(){R(!1)},dispatch:d,selectData:k}),(0,F.jsx)(W.Z,{open:G,handleClose:function(){Y(!1)},data:$,dispatch:d,handleClickOpen:function(e){Y(!0),ee(e)}}),(0,F.jsx)(X,{open:T,handleClose:function(){D(!1)},dispatch:d,admin:p,selectData:E})]}):(0,F.jsx)(o.Z,{})},H=(0,C.ZP)(v.Z)((function(e){var n,r=e.theme;return n={},(0,h.Z)(n,"&.".concat(j.Z.head),{backgroundColor:r.palette.common.black,color:r.palette.common.white}),(0,h.Z)(n,"&.".concat(j.Z.body),{fontSize:14,color:"black",fontWeight:"500"}),n})),B=[{value:"Sr no.",align:"left"},{value:"Reference No.",align:"left"},{value:"Date",align:"left"},{value:"Final Report",align:"left"},{value:"Action",align:"left"}],L=function(e){var n=e.open,r=e.handleClose,i=e.selectData,l=e.dispatch,s=(0,T.Z)(),c=(0,O.Z)(s.breakpoints.down("md")),o=a.useState(""),u=(0,t.Z)(o,2),h=u[0],f=u[1];return(0,F.jsxs)(N.Z,{fullScreen:c,open:n,fullWidth:!0,size:"lg",onClose:r,"aria-labelledby":"responsive-dialog-title",children:[(0,F.jsx)(w.Z,{id:"responsive-dialog-title",children:"Select Job Status"}),(0,F.jsx)(k.Z,{children:(0,F.jsx)("div",{className:"flex flex-col justify-start mb-3",children:(0,F.jsx)(S.Z,{fullWidth:!0,size:"small",onChange:function(e){return f(e.target.value)},children:V&&V.map((function(e){return(0,F.jsx)(P.Z,{value:e.value,children:e.value})}))})})}),(0,F.jsxs)(I.Z,{children:[(0,F.jsx)(p.Z,{variant:"contained",onClick:function(){l((0,d.u0)(i,h))},color:"info",children:"Submit"}),(0,F.jsx)(p.Z,{variant:"contained",onClick:r,color:"error",children:"Cancel"})]})]})},V=[{value:"OPEN"},{value:"OPEN-FOR-NEXT-TEAM"},{value:"IN-PROGRESS"}],X=function(e){var n=e.open,r=e.handleClose,t=e.selectData,a=e.dispatch,i=e.admin,l=(0,T.Z)(),s=(0,O.Z)(l.breakpoints.down("md")),c=m.Ry({trackId:m.Rx().required("Required"),dateOfDispatch:m.Z_().required("Required"),dateOfRecieve:m.Z_().required("Required"),courierServiceName:m.Z_().required("Required"),courierServiceUrl:m.Z_().required("Required")}),o={trackId:"",dateOfDispatch:new Date,dateOfRecieve:new Date,courierServiceName:"",courierServiceUrl:""};return(0,F.jsxs)(N.Z,{fullScreen:s,open:n,maxWidth:"lg",fullWidth:!0,size:"lg",onClose:r,"aria-labelledby":"responsive-dialog-title",children:[(0,F.jsx)(w.Z,{id:"responsive-dialog-title",children:"Courier Details"}),(0,F.jsx)(k.Z,{children:(0,F.jsx)(y.J9,{initialValues:o,validationSchema:c,onSubmit:function(e){a((0,z.fC)((0,u.Z)((0,u.Z)({},e),{},{uniqueJobId:t.uniqueJobId}))),a((0,d.u0)(t,"OPEN-FOR-NEXT-TEAM"));var n={userId:i.user._id,uniqueJobId:t.uniqueJobId,currentJobHolder:t.accountHandledBy};a((0,z.eO)(n))},children:function(e){var n=e.errors,t=e.handleChange,a=e.values,i=e.touched,l=e.setFieldValue;return(0,F.jsx)(y.l0,{className:" rounded-sm p-4 pt-5 pb-5",children:(0,F.jsxs)(g.ZP,{lg:12,md:12,sm:12,xs:12,container:!0,spacing:2,children:[(0,F.jsx)(g.ZP,{lg:4,md:6,sm:12,xs:12,item:!0,children:(0,F.jsx)(R.Z,{heading:"Track ID",handleChange:t,name:"trackId",type:"text",error:i.trackId&&Boolean(n.trackId),helperText:i.trackId?n.trackId:""})}),(0,F.jsx)(g.ZP,{lg:4,md:6,sm:12,xs:12,item:!0,children:(0,F.jsx)(R.Z,{heading:"Courier Service Name",handleChange:t,name:"courierServiceName",type:"text",error:i.courierServiceName&&Boolean(n.courierServiceName),helperText:i.courierServiceName?n.courierServiceName:""})}),(0,F.jsx)(g.ZP,{lg:4,md:6,sm:12,xs:12,item:!0,children:(0,F.jsx)(R.Z,{heading:"Courier Service Url",handleChange:t,name:"courierServiceUrl",type:"text",error:i.courierServiceUrl&&Boolean(n.courierServiceUrl),helperText:i.courierServiceUrl?n.courierServiceUrl:""})}),(0,F.jsx)(g.ZP,{lg:4,md:6,sm:12,xs:12,item:!0,children:(0,F.jsxs)("div",{className:"flex flex-col justify-start",children:[(0,F.jsx)("p",{className:"text-sm mb-2",children:"Date of Dispatch"}),(0,F.jsx)(q.Z,{dateAdapter:A.Z,children:(0,F.jsx)(D.Z,{onChange:function(e){return l("dateOfDispatch",e)},value:a.dateOfDispatch,renderInput:function(e){return(0,F.jsx)(Z.Z,(0,u.Z)((0,u.Z)({},e),{},{fullWidth:!0,size:"small",sx:{background:"#fff"},error:i.dateOfDispatch&&Boolean(n.dateOfDispatch),helperText:i.dateOfDispatch?n.dateOfDispatch:""}))}})})]})}),(0,F.jsx)(g.ZP,{lg:4,md:6,sm:12,xs:12,item:!0,children:(0,F.jsxs)("div",{className:"flex flex-col justify-start",children:[(0,F.jsx)("p",{className:"text-sm mb-2",children:"Date of Recieve"}),(0,F.jsx)(q.Z,{dateAdapter:A.Z,children:(0,F.jsx)(D.Z,{onChange:function(e){return l("dateOfRecieve",e)},value:a.dateOfRecieve,renderInput:function(e){return(0,F.jsx)(Z.Z,(0,u.Z)((0,u.Z)({},e),{},{fullWidth:!0,size:"small",sx:{background:"#fff"},error:i.dateOfRecieve&&Boolean(n.dateOfRecieve),helperText:i.dateOfRecieve?n.dateOfRecieve:""}))}})})]})}),(0,F.jsxs)(g.ZP,{lg:12,md:12,xs:12,sm:12,justifyContent:"flex-end",display:"flex",item:!0,children:[(0,F.jsx)(p.Z,{variant:"contained",type:"submit",color:"info",sx:{marginRight:"10px"},children:"Submit"}),(0,F.jsx)(p.Z,{variant:"contained",onClick:r,color:"error",children:"Cancel"})]})]})})}})})]})},G=function(){var e=(0,l.I0)(),n=(0,s.s0)(),r=(0,l.v9)((function(e){return e.Login})),u=r.isAuth,h=r.admin,f=a.useState(0),x=(0,t.Z)(f,2),m=x[0],p=x[1],g=a.useState(10),Z=(0,t.Z)(g,2),v=Z[0],j=(Z[1],a.useState("")),b=(0,t.Z)(j,2),C=b[0],S=b[1],P=(0,l.v9)((function(e){return e.Entry.updateStatus})).updateStatusSuccess;return(0,a.useEffect)((function(){if(!1===u&&n("/login"),u||m||P){var r=Number("".concat(m,"0"));e((0,d.lI)(r,"",C,h.user._id))}}),[u,m,P]),u?(0,F.jsxs)("div",{className:"m-2 md:m-10 mt-4 p-2 md:p-5 rounded-3xl",children:[(0,F.jsx)(c.Z,{title:"Dispatch Team"}),(0,F.jsx)(i.Z,{setSearchInput:S,searchInput:C,Func:function(n){if("reset"==n&&""!==C){S("");var r=Number("".concat(m,"0"));e((0,d.lI)(r,"","",h.user._id))}else if("search"==n&&""!==C){var t=Number("".concat(m,"0"));e((0,d.lI)(t,"",C,h.user._id))}}}),(0,F.jsx)(M,{searchInput:C,page:m,setPage:p,rowsPerPage:v,setRowsPerPage:v})]}):(0,F.jsx)(o.Z,{})}},5661:function(e,n,r){var t=r(7462),a=r(3366),i=r(2791),l=r(8182),s=r(4419),c=r(890),o=r(8900),d=r(3736),u=r(7673),h=r(5090),f=r(184),x=["className","id"],m=(0,o.ZP)(c.Z,{name:"MuiDialogTitle",slot:"Root",overridesResolver:function(e,n){return n.root}})({padding:"16px 24px",flex:"0 0 auto"}),p=i.forwardRef((function(e,n){var r=(0,d.Z)({props:e,name:"MuiDialogTitle"}),c=r.className,o=r.id,p=(0,a.Z)(r,x),g=r,Z=function(e){var n=e.classes;return(0,s.Z)({root:["root"]},u.a,n)}(g),v=i.useContext(h.Z).titleId,j=void 0===v?o:v;return(0,f.jsx)(m,(0,t.Z)({component:"h2",className:(0,l.Z)(Z.root,c),ownerState:g,ref:n,variant:"h6",id:j},p))}));n.Z=p},3896:function(e,n,r){e.exports=r.p+"static/media/noresult.b17cd1d18137e03fac72.webp"}}]);
//# sourceMappingURL=386.8ce38fe2.chunk.js.map