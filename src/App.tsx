import './App.css'
import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.5,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    })

    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy() // cleanup
    }
  }, [])

  useGSAP(() => {
    const scrollTl = gsap.timeline({ paused: true });
    const bananaTl = gsap.timeline({ paused: true });
    const cheeseTl = gsap.timeline({ paused: true });
    const iceTl = gsap.timeline({ paused: true });
    const brownieTl = gsap.timeline({ paused: true });
    const split = new SplitType(".split-text", {
      types: "chars"
    });

    //Wrap each char in top and bottom spans
    split.chars?.forEach((char) => {
      const charContent = char.textContent;
      char.innerHTML = `
        <span class="letter relative inline-block">
          <span class="letter-top [clip-path:inset(0_0_50%_0)] block h-fit absolute left-0 w-fit opacity-0">${charContent}</span>
          <span class="letter-bottom [clip-path:inset(50%_0_0_0)] block h-fit absolute left-0 w-fit opacity-0">${charContent}</span>
          <span class="letter-top [clip-path:inset(0_0_50%_0)] block h-fit left-0 opacity-0 w-fit">${charContent}</span>
        </span>
      `
    })

    bananaTl.to(".banana-text .letter-top", {
      opacity: 0.2,
      stagger: { each: 0.05, from: "start" }
    }).to(".banana-text .letter-top", {
      opacity: 1,
      color: "white",
      stagger: { each: 0.05, from: "start" }
    }).to(".banana-text .letter-bottom", {
      opacity: 0.5,
      stagger: { each: 0.05, from: "start" }
    }, "<").to(".banana-text .letter-bottom", {
      opacity: 1,
      color: "white",
      stagger: { each: 0.05, from: "end" }
    })

    cheeseTl.to(".cheese-text .letter-top", {
      opacity: 0.2,
      stagger: { each: 0.05, from: "start" }
    }).to(".cheese-text .letter-top", {
      opacity: 1,
      color: "white",
      stagger: { each: 0.05, from: "start" }
    }).to(".cheese-text .letter-bottom", {
      opacity: 0.5,
      stagger: { each: 0.05, from: "start" }
    }, "<").to(".cheese-text .letter-bottom", {
      opacity: 1,
      color: "white",
      stagger: { each: 0.05, from: "end" }
    })

    iceTl.to(".ice-text .letter-top", {
      opacity: 0.2,
      stagger: { each: 0.05, from: "start" }
    }).to(".ice-text .letter-top", {
      opacity: 1,
      color: "white",
      stagger: { each: 0.05, from: "start" }
    }).to(".ice-text .letter-bottom", {
      opacity: 0.5,
      stagger: { each: 0.05, from: "start" }
    }, "<").to(".ice-text .letter-bottom", {
      opacity: 1,
      color: "white",
      stagger: { each: 0.05, from: "end" }
    })

    brownieTl.to(".brownie-text .letter-top", {
      opacity: 0.2,
      stagger: { each: 0.05, from: "start" }
    }).to(".brownie-text .letter-top", {
      opacity: 1,
      color: "white",
      stagger: { each: 0.05, from: "start" }
    }).to(".brownie-text .letter-bottom", {
      opacity: 0.5,
      stagger: { each: 0.05, from: "start" }
    }, "<").to(".brownie-text .letter-bottom", {
      opacity: 1,
      color: "white",
      stagger: { each: 0.05, from: "end" }
    })

    scrollTl.fromTo(".banana-bread", {
      clipPath: "polygon(30% 0%, 70% 20%, 100% 100%, 0% 100%)"
    }, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: 'none',
    }).fromTo(".banana-bread-pic", {
      translateY: "-100px",
    }, {
      translateY: "0px",
      ease: 'power1.in',
    }, "<").fromTo(".cheesecake", {
      clipPath: "polygon(60% 30%, 80% 0%, 100% 100%, 0% 100%)"
    }, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: 'none',
    }).fromTo(".cheesecake-pic", {
      translateY: "-100px",
    }, {
      translateY: "0px",
      ease: 'power1.in',
    }, "<").fromTo(".ice-cream", {
      clipPath: "polygon(20% 10%, 80% 20%, 40% 100%, 60% 100%)"
    }, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: 'none',
    }).fromTo(".ice-cream-pic", {
      translateY: "-100px",
    }, {
      translateY: "0px",
      ease: 'power1.in',
    }, "<").fromTo(".brownie", {
      clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)"
    }, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: 'none',
    }).fromTo(".brownie-pic", {
      translateY: "-100px",
    }, {
      translateY: "0px",
      ease: 'power1.in',
    }, "<")

    ScrollTrigger.create({
      trigger: ".banana-bread",
      start: "top bottom",
      end: "bottom bottom",
      scrub: true,
      animation: bananaTl,
    })

    ScrollTrigger.create({
      trigger: ".cheesecake",
      start: "top bottom",
      end: "bottom bottom",
      scrub: true,
      animation: cheeseTl,
    })

    ScrollTrigger.create({
      trigger: ".ice-cream",
      start: "top bottom",
      end: "bottom bottom",
      scrub: true,
      animation: iceTl,
    })

    ScrollTrigger.create({
      trigger: ".brownie",
      start: "top bottom",
      end: "bottom bottom",
      scrub: true,
      animation: brownieTl,
    })

    ScrollTrigger.create({
      trigger: ".cont",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      snap: {
        snapTo: (progress) => progress < 0.125 ? 0 : progress < 0.375 ? 0.25 : progress < 0.625 ? 0.5 : progress < 0.875 ? 0.75 : 1, // nearest point
        duration: 0.5,
        ease: "power3.out"
      },
      animation: scrollTl,
    })

    gsap.utils.toArray<HTMLParagraphElement>(".note").forEach((note: HTMLParagraphElement) => {
      gsap.to(note, {
        translateY: 0,
        duration: 0.5,
        scrollTrigger: {
          trigger: note.parentElement?.parentElement as HTMLDivElement,
          start: "top 10%",
          end: "top+=50 top",
          toggleActions: "restart none restart none",
        }
      })
    })

    gsap.utils.toArray<HTMLParagraphElement>(".note").forEach((note: HTMLParagraphElement) => {
      gsap.fromTo(note, {
        translateY: 0,
      }, {
        translateY: '-120%',
        duration: 0.5,
        scrollTrigger: {
          trigger: note.parentElement?.parentElement as HTMLDivElement,
          start: "top+=50 top",
          toggleActions: "restart none none none",
        }
      })
    })

    ScrollTrigger.create({
      trigger: ".sundae",
      start: "top top",
      end: `bottom top`,
      pin: true,
      pinSpacing: false,
    })

    ScrollTrigger.create({
      trigger: ".banana-bread",
      start: "top top",
      end: `bottom top`,
      pin: true,
      pinSpacing: false,
    })

    ScrollTrigger.create({
      trigger: ".cheesecake",
      start: "top top",
      end: `bottom top`,
      pin: true,
      pinSpacing: false,
    })

    ScrollTrigger.create({
      trigger: ".ice-cream",
      start: "top top",
      end: `bottom top`,
      pin: true,
      pinSpacing: false,
    })
  }, [])

  return (
    <main className="bg-white w-screen cont">
      <div className='w-screen h-screen flex justify-center items-center sundae relative'>
        <img src='/sundae.jpg' className='w-full h-full object-cover' />
        <h1 className='text-6xl lg:text-7xl font-bold text-black absolute'><span className='font-bodoni font-thin text-7xl lg:text-8xl'>S</span>UNDAE</h1>
        <p className='text-2xl font-light text-black absolute left-4 bottom-4 lg:left-8 lg:bottom-8'>Life is <span className='font-bold'>better</span> with layers</p>
      </div>

      <div className="w-screen h-screen flex justify-center items-center relative banana-bread">
        <img src='/banana-bread.jpg' className='w-full h-full object-cover banana-bread-pic' />
        <h1 className='text-[2.7rem] sm:text-6xl lg:text-7xl font-bold absolute z-10 banana-text split-text text-[#8B5A2B]'><span className='font-bodoni font-thin text-5xl sm:text-7xl lg:text-8xl'>B</span>ANANA BREAD</h1>
        <div className='absolute bottom-4 sm:left-8 sm:bottom-8 overflow-hidden h-6 sm:h-8 flex items-center'>
          <p className='text-xl sm:text-2xl font-light text-white lg:text-black note translate-y-[120%] text-shadow-black text-shadow-2xs'>When life gives you <span className='font-bold'>bananas</span>, bake <span className='font-bold'>bread</span></p>
        </div>
      </div>

      <div className="w-screen h-screen flex justify-center items-center relative cheesecake">
        <img src='/cheesecake.jpg' className='w-full h-full object-cover cheesecake-pic' />
        <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold z-10 absolute cheese-text split-text text-[#990F02]'><span className='font-bodoni font-thin text-6xl sm:text-7xl lg:text-8xl'>C</span>HEESECAKE</h1>
        <div className='absolute left-4 bottom-4 sm:left-8 sm:bottom-8 overflow-hidden h-6 sm:h-8 flex items-center'>
          <p className='text-xl sm:text-2xl sm:font-light text-black note translate-y-[120%]'>Because some indulgences are worth it</p>
        </div>
      </div>

      <div className="w-screen h-screen flex justify-center items-center relative ice-cream">
        <img src='/ice-cream.jpg' className='w-full h-full object-cover ice-cream-pic' />
        <h1 className='text-6xl lg:text-7xl font-bold z-10 absolute ice-text split-text text-[#7B3F00]'><span className='font-bodoni font-thin text-7xl lg:text-8xl'>I</span>CE CREAM</h1>
        <div className='absolute left-4 bottom-4 sm:left-8 sm:bottom-8 overflow-hidden h-8 flex items-center'>
          <p className='text-2xl font-light text-black note translate-y-[120%]'>Scoop up the good stuff</p>
        </div>
      </div>

      <div className="w-screen h-screen flex justify-center items-center relative brownie">
        <img src='/brownies.jpg' className='w-full h-full object-cover brownie-pic' />
        <h1 className='text-6xl lg:text-7xl font-bold z-10 absolute brownie-text split-text text-[#5B381C]'><span className='font-bodoni font-thin text-7xl lg:text-8xl'>B</span>ROWNIE</h1>
        <div className='absolute left-4 bottom-4 sm:left-8 sm:bottom-8 overflow-hidden h-8 flex items-center'>
          <p className='text-2xl sm:font-light max-sm:mix-blend-multiply text-black note translate-y-[120%]'>From oven to cloud nine</p>
        </div>
      </div>
    </main>
  )
}

export default App
