import React,{useRef} from 'react'
import "../../src/index.css"
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/all'
import gsap from 'gsap'
import { useMediaQuery } from 'react-responsive'




 
const Hero = () => {
     const videoRef = useRef();
 
     const isMobile = useMediaQuery({ maxWidth: 767 });
     useGSAP(()=>{
     const heroSplit=new SplitText('.title',{type:'chars,words'});
     const paragraphSplit=new SplitText('.subtitle',{type:'lines'});
     heroSplit.chars.forEach((char)=>char.classList.add('text-gradient'));

     gsap.from(heroSplit.chars,{
      yPercent:100,
      stagger:0.06,
      duration:1.8,
      ease:'expo.out',
     });

     gsap.from(paragraphSplit.lines,{
        opacity:0,
      yPercent:100,
      stagger:0.06,
      duration:1.8,
      ease:'expo.out',
      delay:1,
     });

    gsap.timeline({
	 scrollTrigger: {
		trigger: "#hero",
		start: "top top",
		end: "bottom top",
		scrub: true,
	 },
	})
	.to(".right-leaf", { y: 200 }, 0)
	.to(".left-leaf", { y: -200 }, 0)
	.to(".arrow", { y: 100 }, 0);
	
	const startValue = isMobile ? "top 50%" : "center 60%";  //top 50% here first prop refer to element we are animating and second prop refer to viewport
    //top 50% means when top of element reaches 50% of screen animation starts
	const endValue = isMobile ? "120% top" : "bottom top";
    // 120% top means when 120% of element reaches top of screen animation ends
	
	let tl = gsap.timeline({
	 scrollTrigger: {
		trigger: "video",
		start: startValue,
		end: endValue,
		scrub: true,//when we scroll video will play and when we stop scrolling video will stop
		pin: true,//pin true means video will be fixed in place when animation starts
	 },
	});
	
	videoRef.current.onloadedmetadata = () => {
	 tl.to(videoRef.current, {
		currentTime: videoRef.current.duration,
	 });
    };
  },[])

  return (
   <>
   <section className="noisy" id='hero'>
    <h1 className="title">MOJITO</h1>
    <img src="/images/hero-left-leaf.png" alt="left-leaf" className="left-leaf" />
<img src="/images/hero-right-leaf.png" alt="right-leaf" className="right-leaf" />

    <div className="body">
        <div className="content">
            <div className="space-y-5 hidden md:block">
                <p>Cool,Crisp,Classic.</p>
                <p className="subtitle">Sip the Spirit <br /> of Summer</p>
            </div>

           <div className="view-cocktails">
			 <p className="subtitle">
				Every cocktail on our menu is a blend of premium ingredients,
				creative flair, and timeless recipes — designed to delight your
				senses.
			 </p>
			 <a href="#cocktails">View cocktails</a>
			</div>
        </div>
    </div>
   </section>
     <div className="video absolute inset-0">
        <video src="/videos/output.mp4" ref={videoRef} muted playsInline preload="auto" />
     </div>
   </>
  )
}

export default Hero
