(this["webpackJsonpclient-auth-only"]=this["webpackJsonpclient-auth-only"]||[]).push([[0],{109:function(e,t,a){"use strict";a.r(t);var c=a(1),n=a.n(c),s=a(38),r=a.n(s),l=(a(49),a(15)),o=a(6),i=a(19),d=a(3),b=a(12),j=a.n(b),u=a(2),x=a(0);function m(e){var t=Object(c.useState)("https://www.savoric.com/wp-content/uploads/2018/03/profil-pic_dummy.png"),a=Object(d.a)(t,2),n=a[0],s=a[1],r=Object(c.useState)([]),l=Object(d.a)(r,2),o=l[0],i=l[1],b=Object(c.useState)(0),j=Object(d.a)(b,2),m=j[0],p=j[1],h=Object(c.useState)(0),f=Object(d.a)(h,2),O=f[0],g=f[1],v=Object(c.useState)(0),w=Object(d.a)(v,2),y=w[0],N=w[1],P=Object(c.useState)([]),k=Object(d.a)(P,2),S=k[0],C=k[1],F=Object(c.useState)([]),I=Object(d.a)(F,2),E=I[0],R=I[1],D=Object(c.useState)([]),A=Object(d.a)(D,2),B=A[0],T=A[1],U=Object(c.useState)({fullname:"",email:"",phone:"",education:"",address:"",birthDate:"",gender:"",province:"",city:"",district:"",subdistrict:""}),L=Object(d.a)(U,2),M=L[0],V=L[1];return Object(c.useEffect)((function(){fetch("https://dev.farizdotid.com/api/daerahindonesia/provinsi").then((function(e){return e.json()})).then((function(e){i(e.provinsi)})).catch((function(e){console.log(e)}))}),[]),Object(c.useEffect)((function(){m&&fetch("https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi="+m).then((function(e){return e.json()})).then((function(e){C(e.kota_kabupaten)})).catch((function(e){console.log(e)}))}),[m]),Object(c.useEffect)((function(){O&&fetch("https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota="+O).then((function(e){return e.json()})).then((function(e){R(e.kecamatan)})).catch((function(e){console.log(e)}))}),[O]),Object(c.useEffect)((function(){y&&fetch("https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan="+y).then((function(e){return e.json()})).then((function(e){T(e.kelurahan)})).catch((function(e){console.log(e)}))}),[y]),Object(x.jsxs)("div",{children:[Object(x.jsx)("h1",{className:"text-center font-semibold text-2xl mb-6",children:"Student Information"}),Object(x.jsxs)("div",{className:"flex flex-col items-center mt-2 w-full pr-1",children:[Object(x.jsx)("img",{src:n,alt:"profpict",className:"w-32 rounded-full h-32 object-cover"}),Object(x.jsxs)("label",{className:"cursor-pointer mt-3",children:[Object(x.jsx)("span",{className:"mt-2 leading-normal px-4 py-2 bg-green-500 text-white text-sm rounded-full",children:"Upload Photo"}),Object(x.jsx)("input",{type:"file",className:"hidden",accept:"image/*",onChange:function(t){0!==t.target.files.length?(e.formProfPict(t.target.files[0]),s(URL.createObjectURL(t.target.files[0]))):(e.formProfPict(""),s("https://www.savoric.com/wp-content/uploads/2018/03/profil-pic_dummy.png"))}})]})]}),Object(x.jsxs)("div",{className:"mt-2",children:[Object(x.jsx)("label",{className:"block text-sm text-gray-600",htmlFor:"fullname",children:"Full Name"}),Object(x.jsx)("input",{className:"w-full px-2 py-2 text-gray-700 bg-gray-200 rounded",id:"fullname",name:"fullname",type:"text",placeholder:"Your Full Name",autoComplete:"off","aria-label":"Name",onChange:function(e){V(Object(u.a)(Object(u.a)({},M),{},{fullname:e.target.value}))}})]}),Object(x.jsxs)("div",{className:"inline-block mt-2 w-full lg:w-1/2 pr-1",children:[Object(x.jsx)("label",{className:" block text-sm text-gray-600",children:"Date of Birth"}),Object(x.jsx)("input",{type:"date",name:"dateOfBirth",className:"w-full px-2 py-2 text-gray-700 bg-gray-200 rounded",onChange:function(e){return V(Object(u.a)(Object(u.a)({},M),{},{birthDate:e.target.value}))}})]}),Object(x.jsxs)("div",{className:"inline-block mt-2 w-full lg:w-1/2 pr-1",children:[Object(x.jsx)("label",{className:"block text-sm text-gray-600",htmlFor:"gender",children:"Gender"}),Object(x.jsxs)("div",{className:"relative inline-block w-full text-gray-600",children:[Object(x.jsxs)("select",{className:"w-full h-10 pl-3 pr-6 bg-gray-200 rounded appearance-none focus:shadow-outline",name:"gender",defaultValue:"none",onChange:function(e){return V(Object(u.a)(Object(u.a)({},M),{},{gender:e.target.value}))},children:[Object(x.jsx)("option",{value:"none",disabled:!0,hidden:!0,children:"--- Select Gender ---"}),Object(x.jsx)("option",{value:"male",children:"Male"}),Object(x.jsx)("option",{value:"female",children:"Female"})]}),Object(x.jsx)("div",{className:"absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none",children:Object(x.jsx)("i",{className:"fas fa-caret-down"})})]})]}),Object(x.jsxs)("div",{className:"inline-block mt-2 w-full lg:w-1/2 pr-1",children:[Object(x.jsx)("label",{className:"block text-sm text-gray-600",htmlFor:"email",children:"Email"}),Object(x.jsx)("input",{className:"w-full px-2 py-2 text-gray-700 bg-gray-200 rounded",id:"email",name:"email",type:"email",required:"",placeholder:"example@mail.com","aria-label":"Email",autoComplete:"off",onChange:function(e){V(Object(u.a)(Object(u.a)({},M),{},{email:e.target.value}))}})]}),Object(x.jsxs)("div",{className:"inline-block mt-2 pl-1 w-full lg:w-1/2",children:[Object(x.jsx)("label",{className:" block text-sm text-gray-600",htmlFor:"phone",children:"Phone Number"}),Object(x.jsx)("input",{className:"w-full px-2 py-2 text-gray-700 bg-gray-200 rounded",id:"phone",name:"phone",type:"text",value:M.phone,placeholder:"081234217821","aria-label":"phone",onChange:function(e){var t=e.target.value;(""===t||/^[0-9\b]+$/.test(t))&&V(Object(u.a)(Object(u.a)({},M),{},{phone:t}))},autoComplete:"off"})]}),Object(x.jsxs)("div",{className:"inline-block mt-2 w-full pr-1",children:[Object(x.jsx)("label",{className:"block text-sm text-gray-600",htmlFor:"status",children:"Education"}),Object(x.jsxs)("div",{className:"relative inline-block w-full text-gray-600",children:[Object(x.jsxs)("select",{className:"w-full h-10 pl-3 pr-6 bg-gray-200 rounded appearance-none focus:shadow-outline",placeholder:"Select Role",name:"education",defaultValue:"none",onChange:function(e){V(Object(u.a)(Object(u.a)({},M),{},{education:e.target.value}))},children:[Object(x.jsx)("option",{value:"none",disabled:!0,hidden:!0,children:"Select Education"}),Object(x.jsx)("option",{value:"TK",children:"Kindegarten"}),Object(x.jsx)("option",{value:"SD",children:"Primary School"}),Object(x.jsx)("option",{value:"SMP",children:"Junior High School"}),Object(x.jsx)("option",{value:"SMA",children:"Senior High School"}),Object(x.jsx)("option",{value:"Diploma",children:"Diploma"}),Object(x.jsx)("option",{value:"Bachelor's Degree",children:"Bachelor's Degree"}),Object(x.jsx)("option",{value:"Master Degree",children:"Master Degree"})]}),Object(x.jsx)("div",{className:"absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none",children:Object(x.jsx)("i",{className:"fas fa-caret-down"})})]})]}),Object(x.jsxs)("div",{className:"mt-2",children:[Object(x.jsx)("label",{className:" block text-sm text-gray-600",htmlFor:"address",children:"Address"}),Object(x.jsx)("textarea",{className:"w-full px-2 py-2 text-gray-700 bg-gray-200 rounded",id:"address",name:"address",rows:"3",required:"",placeholder:"Full Address","aria-label":"address",onChange:function(e){V(Object(u.a)(Object(u.a)({},M),{},{address:e.target.value}))}})]}),Object(x.jsxs)("div",{className:"inline-block mt-2 w-full lg:w-1/2 pr-1",children:[Object(x.jsx)("label",{className:"block text-sm text-gray-600",htmlFor:"province",children:"Province"}),Object(x.jsxs)("div",{className:"relative inline-block w-full text-gray-600",children:[Object(x.jsxs)("select",{className:"w-full h-10 pl-3 pr-6 bg-gray-200 rounded appearance-none focus:shadow-outline",name:"province",defaultValue:"none",onChange:function(t){var a=t.target.options[t.target.selectedIndex].text;V(Object(u.a)(Object(u.a)({},M),{},{province:a})),p(t.target.value),e.formprovince(a)},children:[Object(x.jsx)("option",{value:"none",disabled:!0,hidden:!0,children:"--- Select Province ---"}),o.map((function(e){return Object(x.jsx)("option",{value:e.id,children:e.nama},e.id)}))]}),Object(x.jsx)("div",{className:"absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none",children:Object(x.jsx)("i",{className:"fas fa-caret-down"})})]})]}),Object(x.jsxs)("div",{className:"inline-block mt-2 w-full lg:w-1/2 pr-1",children:[Object(x.jsx)("label",{className:"block text-sm text-gray-600",htmlFor:"city",children:"City"}),Object(x.jsxs)("div",{className:"relative inline-block w-full text-gray-600",children:[Object(x.jsxs)("select",{className:"w-full h-10 pl-3 pr-6 bg-gray-200 rounded appearance-none focus:shadow-outline",name:"city",defaultValue:"none",onChange:function(t){var a=t.target.options[t.target.selectedIndex].text;V(Object(u.a)(Object(u.a)({},M),{},{city:a})),g(t.target.value),e.formcity(a)},children:[Object(x.jsx)("option",{value:"none",disabled:!0,hidden:!0,children:"--- Select City ---"}),S.map((function(e){return Object(x.jsx)("option",{value:e.id,children:e.nama},e.id)}))]}),Object(x.jsx)("div",{className:"absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none",children:Object(x.jsx)("i",{className:"fas fa-caret-down"})})]})]}),Object(x.jsxs)("div",{className:"inline-block mt-2 w-full lg:w-1/2 pr-1",children:[Object(x.jsx)("label",{className:"block text-sm text-gray-600",htmlFor:"city",children:"Kecamatan"}),Object(x.jsxs)("div",{className:"relative inline-block w-full text-gray-600",children:[Object(x.jsxs)("select",{className:"w-full h-10 pl-3 pr-6 bg-gray-200 rounded appearance-none focus:shadow-outline",name:"district",defaultValue:"none",onChange:function(t){var a=t.target.options[t.target.selectedIndex].text;V(Object(u.a)(Object(u.a)({},M),{},{district:a})),N(t.target.value),e.formdistrict(a)},children:[Object(x.jsx)("option",{value:"none",disabled:!0,hidden:!0,children:"--- Select Kecamatan ---"}),E.map((function(e){return Object(x.jsx)("option",{value:e.id,children:e.nama},e.id)}))]}),Object(x.jsx)("div",{className:"absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none",children:Object(x.jsx)("i",{className:"fas fa-caret-down"})})]})]}),Object(x.jsxs)("div",{className:"inline-block mt-2 w-full lg:w-1/2 pr-1",children:[Object(x.jsx)("label",{className:"block text-sm text-gray-600",htmlFor:"city",children:"Kelurahan"}),Object(x.jsxs)("div",{className:"relative inline-block w-full text-gray-600",children:[Object(x.jsxs)("select",{className:"w-full h-10 pl-3 pr-6 bg-gray-200 rounded appearance-none focus:shadow-outline",name:"subdistrict",defaultValue:"none",onChange:function(t){var a=t.target.options[t.target.selectedIndex].text;V(Object(u.a)(Object(u.a)({},M),{},{subdistrict:a})),e.formsubdistrict(a)},children:[Object(x.jsx)("option",{value:"none",disabled:!0,hidden:!0,children:"--- Select Kelurahan ---"}),B.map((function(e){return Object(x.jsx)("option",{value:e.id,children:e.nama},e.id)}))]}),Object(x.jsx)("div",{className:"absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none",children:Object(x.jsx)("i",{className:"fas fa-caret-down"})})]})]}),Object(x.jsxs)("div",{className:"mt-2",children:[Object(x.jsx)("label",{className:" block text-sm text-gray-600",htmlFor:"additionalInfo",children:"Additional Info"}),Object(x.jsx)("textarea",{className:"w-full px-2 py-2 text-gray-700 bg-gray-200 rounded",id:"additionalInfo",name:"additionalInfo",rows:"3",required:"",placeholder:"Achievement or Other Information","aria-label":"additionalInfo",onChange:function(e){V(Object(u.a)(Object(u.a)({},M),{},{additionalInfo:e.target.value}))}})]})]})}function p(e){var t=Object(c.useState)(""),a=Object(d.a)(t,2),n=a[0],s=a[1];return Object(x.jsxs)("div",{className:"lg:w-3/4 mx-auto",children:[Object(x.jsx)("h1",{className:"text-center font-semibold text-2xl mb-6",children:"Parent Information"}),Object(x.jsxs)("div",{className:"mt-2",children:[Object(x.jsx)("label",{className:"block text-sm text-gray-600 mb-2",htmlFor:"parentFullname",children:"Parent Full Name"}),Object(x.jsx)("input",{className:"w-full px-2 py-2 text-gray-700 bg-gray-200 rounded mb-2",id:"parentFullname",name:"parentFullname",type:"text",placeholder:"Parent Full Name",autoComplete:"off","aria-label":"Name"})]}),Object(x.jsxs)("div",{className:"inline-block mt-2 w-1/2 pr-1",children:[Object(x.jsx)("label",{className:"block text-sm text-gray-600 mb-2",htmlFor:"parentEmail",children:"Parent Email"}),Object(x.jsx)("input",{className:"w-full px-2 py-2 text-gray-700 bg-gray-200 rounded",id:"parentEmail",name:"parentEmail",type:"email",required:"",placeholder:"example@mail.com","aria-label":"parentEmail",autoComplete:"off"})]}),Object(x.jsxs)("div",{className:"inline-block mt-2 pl-1 w-1/2",children:[Object(x.jsx)("label",{className:" block text-sm text-gray-600 mb-2",htmlFor:"parentPhone",children:"Parent Phone Number"}),Object(x.jsx)("input",{className:"w-full px-2 py-2 text-gray-700 bg-gray-200 rounded",id:"parentPhone",name:"parentPhone",type:"text",value:n,placeholder:"081234217821","aria-label":"parentPhone",autoComplete:"off",onChange:function(e){var t=e.target.value;(""===t||/^[0-9\b]+$/.test(t))&&s(t)}})]}),Object(x.jsxs)("div",{className:"mt-2",children:[Object(x.jsx)("label",{className:"block text-sm text-gray-600 mb-2",htmlFor:"job",children:"Parent Job"}),Object(x.jsx)("input",{className:"w-full px-2 py-2 text-gray-700 bg-gray-200 rounded mb-2",id:"job",name:"job",type:"text",placeholder:"Parent Job",autoComplete:"off","aria-label":"Name"})]})]})}function h(e){return Object(x.jsxs)("div",{className:"w-full",children:[Object(x.jsx)("div",{className:"flex justify-center",children:Object(x.jsx)("i",{className:"far fa-check-circle text-9xl text-green-400 my-3"})}),Object(x.jsx)("h1",{className:"text-green-300 text-center font-extrabold text-4xl mb-3",children:"Success"}),"verify"===e.page?Object(x.jsxs)("p",{className:"text-center",children:["Email Has Been Verified,",Object(x.jsx)("br",{}),"Please Login to your account"]}):"reset"===e.page?Object(x.jsxs)("p",{className:"text-center",children:["Password Successfuly reset,",Object(x.jsx)("br",{}),"Please Login to your account"]}):Object(x.jsxs)("p",{className:"text-center",children:["We received your personal information.",Object(x.jsx)("br",{}),"Our team will contact you by phone as soon as posible",Object(x.jsx)("br",{}),"Make sure your phone number is active"]})]})}function f(e){var t=e.file,a=Object(c.useState)(""),n=Object(d.a)(a,2),s=n[0],r=n[1];return Object(x.jsxs)("div",{children:[Object(x.jsx)("h1",{className:"text-center font-semibold text-2xl mb-6",children:"Upload Bank Transfer"}),Object(x.jsx)("p",{className:"text-center font-medium text-xl",children:"Please Transfer to This Bank Account"}),Object(x.jsx)("h3",{className:"text-center font-semibold text-xl mt-5",children:"BANK BNI"}),Object(x.jsx)("h3",{className:"text-center font-semibold text-xl",children:"6666667973"}),Object(x.jsx)("p",{className:"text-center font-light text-xl",children:"a/n"}),Object(x.jsx)("p",{className:"text-center font-semibold text-xl",children:"Perkumpulan Akademi Golf Indonesia"}),Object(x.jsx)("p",{className:"text-center mt-10",children:"Upload Bank Transfer Proof"}),s?Object(x.jsx)("img",{src:s,className:"w-1/2 block mx-auto my-5",alt:"imgBank"}):"",Object(x.jsx)("input",{type:"file",className:"block mx-auto px-2 py-2 text-gray-700 bg-gray-100 rounded",accept:"image/*",onChange:function(e){0!==e.target.files.length&&(t(e.target.files[0]),r(URL.createObjectURL(e.target.files[0])))}})]})}var O=a(39),g=a.n(O).a.create({baseURL:"https://pagi-api.grt19.com/"}),v=a(17),w=a.n(v),y=a(5),N=a(43),P=a.n(N);a(105);function k(){var e=j()(1),t=Object(d.a)(e,2),a=t[0],n=t[1],s=j()(!1),r=Object(d.a)(s,2),l=r[0],o=r[1],b=Object(c.useRef)(null),u=Object(c.useRef)(null),O=j()({}),v=Object(d.a)(O,3),N=v[0],k=v[1],S=v[2],C=j()({}),F=Object(d.a)(C,3),I=F[0],E=F[1],R=F[2],D=j()(0),A=Object(d.a)(D,2),B=A[0],T=A[1],U=j()(0),L=Object(d.a)(U,2),M=L[0],V=L[1],K=j()(0),_=Object(d.a)(K,2),J=_[0],Y=_[1],z=j()(0),q=Object(d.a)(z,2),G=q[0],H=q[1],$=j()(""),W=Object(d.a)($,2),Q=W[0],X=W[1],Z=j()(""),ee=Object(d.a)(Z,2),te=ee[0],ae=ee[1],ce=w.a.mixin({toast:!0,position:"top",showConfirmButton:!1,timer:3e3,timerProgressBar:!0});function ne(e){var t=!1;for(var a in e){if("additionalInfo"===a&&(console.log("masook"),!e.additionalInfo)){t=!0;break}if(!e[a]){t=!1;break}t=!0}return!!t}return Object(x.jsxs)("div",{className:"p-3 lg:p-10 bg-cover bg-center bg-no-repeat bg-gray-200 min-h-screen",children:[l?Object(x.jsx)("div",{className:"bg-black fixed h-full w-screen right-0 top-0 bg-opacity-50 z-50 flex justify-center items-center",children:Object(x.jsx)(P.a,{type:"Circles",color:"#fff",height:80,width:80})}):"",Object(x.jsxs)("div",{children:[Object(x.jsx)("h1",{className:"text-center font-semibold text-3xl mb-5",children:"PAGI Registration Form"}),Object(x.jsx)("div",{className:"lg:w-2/3 mx-auto px-8 lg:px-20 py-7 bg-white rounded-lg shadow-md",children:Object(x.jsxs)(y.a,{activeStep:a,children:[Object(x.jsx)(y.b,{label:"Student Info",children:Object(x.jsx)("div",{className:"p-3 lg:p-2 bg-cover bg-center bg-no-repeat",children:Object(x.jsxs)("form",{ref:b,children:[Object(x.jsx)(m,{formprovince:T,formcity:V,formdistrict:Y,formsubdistrict:H,formProfPict:ae}),Object(x.jsx)("div",{className:"flex justify-end w-full",children:Object(x.jsx)("button",{className:"btn bg-green-400 px-4 py-2 rounded text-white mt-5",onClick:function(e){e.preventDefault(),k({fullname:b.current.fullname.value,email:b.current.email.value,phone:b.current.phone.value,education:b.current.education.value,address:b.current.address.value,birthDate:b.current.dateOfBirth.value,additionalInfo:b.current.additionalInfo.value,gender:b.current.gender.value,province:B,city:M,district:J,subdistrict:G}),ne(S.current)&&te&&"https://www.savoric.com/wp-content/uploads/2018/03/profil-pic_dummy.png"!==te?n(a+1):ce.fire({icon:"error",title:"All inputs must be filled "})},children:"Next"})})]})})}),Object(x.jsxs)(y.b,{label:"Parent Info",children:[Object(x.jsx)("form",{ref:u,children:Object(x.jsx)(p,{})}),Object(x.jsxs)("div",{className:"flex justify-between w-full",children:[Object(x.jsx)("button",{className:"btn bg-green-400 px-4 py-2 rounded text-white mt-5",onClick:function(){return n(a-1)},children:"Prev"}),Object(x.jsx)("button",{className:"btn bg-green-400 px-4 py-2 rounded text-white mt-5",onClick:function(e){e.preventDefault(),E({parentFullname:u.current.parentFullname.value,parentEmail:u.current.parentEmail.value,parentPhone:u.current.parentPhone.value,parentJob:u.current.job.value}),ne(R.current)?n(a+1):ce.fire({icon:"error",title:"All inputs must be filled "})},children:"Next"})]})]}),Object(x.jsxs)(y.b,{label:"Payment Proof",children:[Object(x.jsx)(f,{file:X}),Object(x.jsxs)("div",{className:"flex justify-between w-full",children:[Object(x.jsx)("button",{className:"btn bg-green-400 px-4 py-2 rounded text-white mt-5",onClick:function(){return n(a-1)},children:"Prev"}),Object(x.jsx)("button",{className:"btn bg-green-400 px-4 py-2 rounded text-white mt-5",onClick:function(){!function(){if(Q){o(!0);var e=new FormData;for(var t in e.append("transferProof",Q),e.append("profilePict",te),N)e.append(t,N[t]);for(var c in I)e.append(c,I[c]);g({method:"POST",url:"student/register",headers:Object(i.a)({},"Access-Control-Allow-Origin","*"),data:e}).then((function(e){o(!1),n(a+1)})).catch((function(e){o(!1),e.response?ce.fire({icon:"error",title:e.response.data.errors.join()}):ce.fire({icon:"error",title:e})}))}else ce.fire({icon:"error",title:"Please Upload Payment Proof to Register"})}()},children:"Register"})]})]}),Object(x.jsx)(y.b,{label:"Done",children:Object(x.jsx)(h,{})})]})})]})]})}var S=a(23),C=a.n(S),F=a(44);function I(e){return Object(x.jsxs)("div",{className:"lg:w-3/4 mx-auto",children:[Object(x.jsx)("h1",{className:"text-center font-semibold text-2xl mb-6",children:"Set Up Your Password"}),Object(x.jsxs)("form",{children:[Object(x.jsxs)("div",{className:"mt-2",children:[Object(x.jsx)("label",{className:"block text-sm text-gray-600 mb-2",htmlFor:"password",children:"New Password"}),Object(x.jsx)("input",{className:"w-full px-2 py-2 text-gray-700 bg-gray-200 rounded mb-2",id:"password",name:"password",type:"password",placeholder:"New Password",autoComplete:"off","aria-label":"password",value:e.password.password,onChange:e.changePassword})]}),Object(x.jsxs)("div",{className:"mt-2",children:[Object(x.jsx)("label",{className:"block text-sm text-gray-600 mb-2",htmlFor:"retype password",children:"Re-Type Password"}),Object(x.jsx)("input",{className:"w-full px-2 py-2 text-gray-700 bg-gray-200 rounded",id:"retype password",name:"retype password",type:"password",placeholder:"Re-Type Password",autoComplete:"off",value:e.password.retype,"aria-label":"retype password",onChange:e.retypePass})]})]})]})}function E(){var e=new URLSearchParams(Object(o.g)().search).get("token"),t=Object(c.useState)(1),a=Object(d.a)(t,2),n=a[0],s=a[1],r=Object(c.useState)({password:"",retype:""}),l=Object(d.a)(r,2),i=l[0],b=l[1],j=Object(c.useState)(!0),m=Object(d.a)(j,2),p=m[0],f=m[1];function O(){return(O=Object(F.a)(C.a.mark((function t(a){return C.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:a.preventDefault(),1===n&&(i.password===i.retype?f(!0):f(!1),p&&g({method:"POST",url:"auth/student/verify?token=".concat(e),data:{password:i.password}}).then((function(){s(n+1)})).catch((function(e){console.log(e.response)})));case 2:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return Object(x.jsxs)("div",{className:"bg-gray-200 h-screen p-3",children:[Object(x.jsx)("h1",{className:"text-center font-semibold text-3xl mb-5",children:"Verify Your Account"}),e?Object(x.jsx)("div",{className:"lg:w-1/2 mx-auto px-10 py-7 bg-white rounded-lg shadow-md",children:Object(x.jsxs)(y.a,{activeStep:n,children:[Object(x.jsx)(y.b,{label:"Password",children:Object(x.jsxs)("div",{children:[p?"":Object(x.jsx)("div",{className:"bg-red-200 text-red-600 font-bold px-3 py-2 rounded-md",children:Object(x.jsx)("p",{children:"Password Not Match"})}),Object(x.jsx)(I,{password:i,changePassword:function(e){b(Object(u.a)(Object(u.a)({},i),{},{password:e.target.value}))},retypePass:function(e){b(Object(u.a)(Object(u.a)({},i),{},{retype:e.target.value}))}}),Object(x.jsx)("div",{className:"flex flex-row w-full justify-end",children:Object(x.jsx)("button",{className:"btn bg-green-400 px-4 py-2 rounded text-white mt-5 ",onClick:function(e){return O.apply(this,arguments)},children:"Next"})})]})}),Object(x.jsx)(y.b,{label:"Confirm",children:Object(x.jsx)(h,{page:"verify"})})]})}):Object(x.jsx)(o.a,{to:"/"})]})}function R(){var e=new URLSearchParams(Object(o.g)().search).get("token"),t=Object(c.useState)(1),a=Object(d.a)(t,2),n=a[0],s=a[1],r=Object(c.useState)({password:"",retype:""}),l=Object(d.a)(r,2),i=l[0],b=l[1],j=Object(c.useState)(!0),m=Object(d.a)(j,2),p=m[0],f=m[1];return Object(x.jsxs)("div",{className:"bg-gray-200 h-screen p-3",children:[Object(x.jsx)("h1",{className:"text-center font-semibold text-3xl mb-5",children:"Verify Your Account"}),e?Object(x.jsx)("div",{className:"w-1/2 mx-auto px-10 py-7 bg-white rounded-lg shadow-md",children:Object(x.jsxs)(y.a,{activeStep:n,children:[Object(x.jsx)(y.b,{label:"Password",children:Object(x.jsxs)("div",{children:[p?"":Object(x.jsx)("div",{className:"bg-red-200 text-red-600 font-bold px-3 py-2 rounded-md",children:Object(x.jsx)("p",{children:"Password Not Match"})}),Object(x.jsx)(I,{password:i,changePassword:function(e){b(Object(u.a)(Object(u.a)({},i),{},{password:e.target.value}))},retypePass:function(e){b(Object(u.a)(Object(u.a)({},i),{},{retype:e.target.value}))}}),Object(x.jsx)("button",{className:"btn bg-green-400 px-4 py-2 rounded text-white mt-5 mx-auto block",onClick:function(){i.password!==i.retype?f(!1):(f(!0),g({method:"POST",url:"/auth/staff/verify",data:{password:i.password,token:e}}).then((function(){s(2)})).catch((function(e){console.log(e)})))},children:"Create New Password"})]})}),Object(x.jsx)(y.b,{label:"Confirm",children:Object(x.jsx)(h,{page:"verify"})})]})}):Object(x.jsx)(o.a,{to:"/"})]})}function D(){var e=new URLSearchParams(Object(o.g)().search).get("token"),t=Object(c.useState)(1),a=Object(d.a)(t,2),n=a[0],s=a[1],r=Object(c.useState)({password:"",retype:""}),l=Object(d.a)(r,2),i=l[0],b=l[1],j=Object(c.useState)(!0),m=Object(d.a)(j,2),p=m[0],f=m[1];return Object(x.jsxs)("div",{className:"bg-gray-200 h-screen p-3",children:[Object(x.jsx)("h1",{className:"text-center font-semibold text-3xl mb-5",children:"Verify Your Account"}),e?Object(x.jsx)("div",{className:"lg:w-1/2 mx-auto px-10 py-7 bg-white rounded-lg shadow-md",children:Object(x.jsxs)(y.a,{activeStep:n,children:[Object(x.jsx)(y.b,{label:"Password",children:Object(x.jsxs)("div",{children:[p?"":Object(x.jsx)("div",{className:"bg-red-200 text-red-600 font-bold px-3 py-2 rounded-md",children:Object(x.jsx)("p",{children:"Password Not Match"})}),Object(x.jsx)(I,{password:i,changePassword:function(e){b(Object(u.a)(Object(u.a)({},i),{},{password:e.target.value}))},retypePass:function(e){b(Object(u.a)(Object(u.a)({},i),{},{retype:e.target.value}))}}),Object(x.jsx)("button",{className:"btn bg-green-400 px-4 py-2 rounded text-white mt-5 mx-auto block",onClick:function(){i.password!==i.retype?f(!1):(f(!0),g({method:"POST",url:"/auth/parent/verify",data:{password:i.password,token:e}}).then((function(){s(2)})).catch((function(e){console.log(e)})))},children:"Create New Password"})]})}),Object(x.jsx)(y.b,{label:"Confirm",children:Object(x.jsx)(h,{page:"verify"})})]})}):Object(x.jsx)(o.a,{to:"/"})]})}function A(){var e=Object(c.useState)({password:"",retype:""}),t=Object(d.a)(e,2),a=t[0],n=t[1],s=Object(c.useState)(1),r=Object(d.a)(s,2),l=r[0],i=r[1],b=Object(c.useState)(!0),j=Object(d.a)(b,2),m=j[0],p=j[1],f=Object(o.h)().role,O=new URLSearchParams(Object(o.g)().search).get("token");return Object(x.jsx)("div",{className:"p-3 lg:p-10 bg-cover bg-center bg-no-repeat bg-gray-200 min-h-screen",children:Object(x.jsxs)("div",{children:[Object(x.jsx)("h1",{className:"text-center font-semibold text-3xl mb-5",children:"Reset Your Password"}),Object(x.jsx)("div",{className:"lg:w-2/3 mx-auto px-8 lg:px-20 py-7 bg-white rounded-lg shadow-md",children:Object(x.jsxs)(y.a,{activeStep:l,children:[Object(x.jsx)(y.b,{label:"Set Password",children:Object(x.jsxs)("div",{children:[!m&&Object(x.jsx)("div",{className:"bg-red-200 text-red-600 font-bold px-3 py-2 rounded-md",children:Object(x.jsx)("p",{children:"Password Not Match"})}),Object(x.jsx)(I,{password:a,changePassword:function(e){n(Object(u.a)(Object(u.a)({},a),{},{password:e.target.value}))},retypePass:function(e){n(Object(u.a)(Object(u.a)({},a),{},{retype:e.target.value}))}}),Object(x.jsx)("button",{className:"bg-green-500 text-white px-4 py-2 rounded-lg my-4 w-1/2 block mx-auto",onClick:function(e){e.preventDefault();var t="";"student"===f?t="/student/resetpassword":"staff"===f&&(t="/staff/resetpassword"),a.password===a.retype&&a.password&&a.retype?(p(!0),g({method:"PATCH",url:"auth".concat(t,"?token=").concat(O),data:{password:a.password}}).then((function(){i(l+1)})).catch((function(e){console.log(e.response.data),e.response?w.a.fire("Error!",e.response.data.errors.join(),"error"):w.a.fire("Error!",e,"error")}))):p(!1)},children:"Reset Password"})]})}),Object(x.jsx)(y.b,{label:"Success",children:Object(x.jsx)(h,{page:"reset"})})]})})]})})}var B=function(){return Object(x.jsx)(l.a,{children:Object(x.jsxs)(o.d,{children:[Object(x.jsx)(o.b,{exact:!0,path:"/",children:Object(x.jsx)(o.a,{to:"/register"})}),Object(x.jsx)(o.b,{path:"/register",children:Object(x.jsx)(k,{})}),Object(x.jsx)(o.b,{path:"/verify/student",children:Object(x.jsx)(E,{})}),Object(x.jsx)(o.b,{path:"/verify/staff",children:Object(x.jsx)(R,{})}),Object(x.jsx)(o.b,{path:"/verify/parent",children:Object(x.jsx)(D,{})}),Object(x.jsx)(o.b,{path:"/resetpassword/:role",children:Object(x.jsx)(A,{})})]})})},T=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,110)).then((function(t){var a=t.getCLS,c=t.getFID,n=t.getFCP,s=t.getLCP,r=t.getTTFB;a(e),c(e),n(e),s(e),r(e)}))};r.a.render(Object(x.jsx)(n.a.StrictMode,{children:Object(x.jsx)(B,{})}),document.getElementById("root")),T()},49:function(e,t,a){}},[[109,1,2]]]);
//# sourceMappingURL=main.4c3251c4.chunk.js.map