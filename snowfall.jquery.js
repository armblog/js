!function(t){t.snowfall=function(e,i){function s(s,h,n,o,l){this.id=l,this.x=s,this.y=h,this.size=n,this.speed=o,this.step=0,this.stepSize=a(1,10)/100,i.collection&&(this.target=x[a(0,x.length-1)]);var d=t(document.createElement("div")).attr({"class":"snowfall-flakes",id:"flake-"+this.id}).css({width:this.size,height:this.size,background:i.flakeColor,position:"absolute",top:this.y,left:this.x,fontSize:0,zIndex:i.flakeIndex});t(e).get(0).tagName===t(document).get(0).tagName?(t("body").append(d),e=t("body")):t(e).append(d),this.element=document.getElementById("flake-"+this.id),this.update=function(){if(this.y+=this.speed,this.y>r-(this.size+6)&&this.reset(),this.element.style.top=this.y+"px",this.element.style.left=this.x+"px",this.step+=this.stepSize,this.x+=S===!1?Math.cos(this.step):S+Math.cos(this.step),i.collection&&this.x>this.target.x&&this.x<this.target.width+this.target.x&&this.y>this.target.y&&this.y<this.target.height+this.target.y){var t=this.target.element.getContext("2d"),e=this.x-this.target.x,s=this.y-this.target.y,h=this.target.colData;if(void 0!==h[parseInt(e)][parseInt(s+this.speed+this.size)]||s+this.speed+this.size>this.target.height)if(s+this.speed+this.size>this.target.height){for(;s+this.speed+this.size>this.target.height&&this.speed>0;)this.speed*=.5;t.fillStyle="#fff",void 0==h[parseInt(e)][parseInt(s+this.speed+this.size)]?(h[parseInt(e)][parseInt(s+this.speed+this.size)]=1,t.fillRect(e,s+this.speed+this.size,this.size,this.size)):(h[parseInt(e)][parseInt(s+this.speed)]=1,t.fillRect(e,s+this.speed,this.size,this.size)),this.reset()}else this.speed=1,this.stepSize=0,parseInt(e)+1<this.target.width&&void 0==h[parseInt(e)+1][parseInt(s)+1]?this.x++:parseInt(e)-1>0&&void 0==h[parseInt(e)-1][parseInt(s)+1]?this.x--:(t.fillStyle="#fff",t.fillRect(e,s,this.size,this.size),h[parseInt(e)][parseInt(s)]=1,this.reset())}(this.x>p-f||this.x<f)&&this.reset()},this.reset=function(){this.y=0,this.x=a(f,p-f),this.stepSize=a(1,10)/100,this.size=a(100*i.minSize,100*i.maxSize)/100,this.speed=a(i.minSpeed,i.maxSpeed)}}function h(){for(d=0;d<o.length;d+=1)o[d].update();c=setTimeout(function(){h()},30)}var n={flakeCount:35,flakeColor:"#ffffff",flakeIndex:999999,minSize:1,maxSize:2,minSpeed:1,maxSpeed:5,round:!1,shadow:!1,collection:!1,collectionHeight:40,deviceorientation:!1},i=t.extend(n,i),a=function(t,e){return Math.round(t+Math.random()*(e-t))};t(e).data("snowfall",this);var o=[],l=0,d=0,r=t(e).height(),p=t(e).width(),f=0,c=0;if(i.collection!==!1){var g=document.createElement("canvas");if(g.getContext&&g.getContext("2d"))for(var x=[],m=t(i.collection),u=i.collectionHeight,d=0;d<m.length;d++){var z=m[d].getBoundingClientRect(),w=document.createElement("canvas"),y=[];if(z.top-u>0){document.body.appendChild(w),w.style.position="absolute",w.height=u,w.width=z.width,w.style.left=z.left+"px",w.style.top=z.top-u+"px";for(var v=0;v<z.width;v++)y[v]=[];x.push({element:w,x:z.left,y:z.top-u,width:z.width,height:u,colData:y})}}else i.collection=!1}for(t(e).get(0).tagName===t(document).get(0).tagName&&(f=25),t(window).bind("resize",function(){r=t(e).height(),p=t(e).width()}),d=0;d<i.flakeCount;d+=1)l=o.length,o.push(new s(a(f,p-f),a(0,r),a(100*i.minSize,100*i.maxSize)/100,a(i.minSpeed,i.maxSpeed),l));i.round&&t(".snowfall-flakes").css({"-moz-border-radius":i.maxSize,"-webkit-border-radius":i.maxSize,"border-radius":i.maxSize}),i.shadow&&t(".snowfall-flakes").css({"-moz-box-shadow":"1px 1px 1px #555","-webkit-box-shadow":"1px 1px 1px #555","box-shadow":"1px 1px 1px #555"});var S=!1;i.deviceorientation&&t(window).bind("deviceorientation",function(t){S=.1*t.originalEvent.gamma}),h(),this.clear=function(){t(e).children(".snowfall-flakes").remove(),o=[],clearTimeout(c)}},t.fn.snowfall=function(e){return"object"==typeof e||void 0==e?this.each(function(){new t.snowfall(this,e)}):"string"==typeof e?this.each(function(){var e=t(this).data("snowfall");e&&e.clear()}):void 0}}(jQuery);