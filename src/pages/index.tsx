import React from 'react';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import AnimatedTextWord from '../components/AnimatedTextWord';
import AnimatedTextCharacter from '../components/AnimatedTextCharacter';
import HomePage from '../components/PadhuScreen';

gsap.registerPlugin(useGSAP);

export default function Main() {
  return <>
  {FramerTextAnimation()}
  </>
}

function TextAnimations() {
  return <div className="container h-screen mx-auto flex flex-col items-center justify-center">
    <AnimatedTextWord text="animated text with framer-motion" />
    <AnimatedTextCharacter text="animated text with framer-motion" />
  </div>
}

function FramerTextAnimation() {
  const text = "Framer Motion is a really cool tool".split(" ");

  return <div className="App">
    {text.map((el, i) => (
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.25,
          delay: i / 10,
        }}
        key={i}
      >
        {el}{" "}
      </motion.span>
    ))}
  </div>
}

function framerButton() {
  return <motion.button
    whileTap={{ scale: 0.85 }}
  >
    Click me!
  </motion.button>
}

function TextAnimation() {
  const container = useRef();
  useGSAP(() => {
    // gsap code here...
    gsap.to(".box", { x: 100 }); // <-- automatically reverted

  }, { scope: container }); // <-- easily add a scope for selector text (optional)
}

function Boxes() {
  const container = useRef<any>();
  const tl = useRef<any>();

  const toggleTimeline = () => {
    tl.current.reversed(!tl.current.reversed());
  };

  useGSAP(
    () => {
      const boxes = gsap.utils.toArray('.box') as any;
      tl.current = gsap
        .timeline()
        .to(boxes[0], { x: -120, rotation: 360 })
        .to(boxes[1], { x: 0, rotation: -360 }, '<')
        .to(boxes[2], { x: 120, rotation: 360 }, '<')
        .reverse();
    },
    { scope: container }
  );

  return (
    <main>
      <section className="boxes-container" ref={container}>
        <h2>Use the button to toggle a Timeline</h2>
        <div>
          <button onClick={toggleTimeline}>Toggle Timeline</button>
        </div>
        <div className="box gradient-blue">Box 1</div>
        <div className="box gradient-blue">Box 2</div>
        <div className="box gradient-blue">Box 3</div>
      </section>
    </main>
  );
}
