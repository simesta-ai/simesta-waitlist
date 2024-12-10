"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

import { IMAGES } from "./constants";
import { useState } from "react";

import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PsychologyIcon from "@mui/icons-material/Psychology";
import CodeIcon from "@mui/icons-material/Code";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [formValue, setValue] = useState({
    email: "",
    phone: "",
    name: "",
  });
  const handleSubmit = async () => {
    // validate that the fields are not empty, the email is valid
    if (!formValue.email || !formValue.phone || !formValue.name) {
      return toast.error("Please fill all fields");
    }
    if (!formValue.email.includes("@") || !formValue.email.includes(".")) {
      return toast.error("Please enter a valid email");
    }
    const response = await fetch('https://naughty-aleta-simesta-73e5c383.koyeb.app/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValue),
    })
    if (response.status !== 200) {
      const data = await response.json()
      toast.error(data.message)
    } else {
      toast(`You have been added to the community. Check your mail.`, {
        type: "success"
      })
    }
    



    setValue({
      email: "",
      phone: "",
      name: "",
    });
  };
  const gotoform = () => {
    document.getElementById("join")!.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.page}>
      <Image
        className={styles.backgroundImg}
        alt="background"
        src={IMAGES.bg}
        width={1000}
        height={1000}
      />
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.logoContainer}>
          <Image
            alt="logo"
            className={styles.logo}
            src={IMAGES.coloredLogo}
            width={1000}
            height={1000}
          />
          <h1 className={styles.logoname}>simesta.ai</h1>
        </div>
        <button onClick={gotoform} type="button" className={styles.headerBtn}>
          Join Simesta community
        </button>
      </div>

      {/* Hero */}
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Learn <span className={styles.highLight}>anything</span> you want, in
          your <span className={styles.highLight}>own</span> way.
        </h1>
        <p className={styles.heroSubtitle}>
          Join our community of learners waiting to take their learning
          experience to the next level with the Simesta AI assistant.
        </p>
        <button onClick={gotoform} type="button" className={styles.whiteBtn}>
          Join Simesta community
        </button>
      </div>

      {/* Features */}
      <h2 className={styles.subHeaderText}>What's in store for you?</h2>
      <div className={styles.features}>
        <div className={styles.feature}>
          <div>
            <MenuBookIcon className={styles.featureIcon} />
          </div>
          <div className={styles.featureDetails}>
            <h2 className={styles.featureTitle}>Learn Your Own Way</h2>
            <p className={styles.featureDesc}>
              Learn anything you want to learn in a way tailored to your
              individual learning style and apply the knowledge gained in
              relevant cases.
            </p>
          </div>
        </div>
        <div className={styles.feature}>
          <div>
            <CodeIcon className={styles.featureIcon} />
          </div>
          <div className={styles.featureDetails}>
            <h2 className={styles.featureTitle}>AI-generated Content</h2>
            <p className={styles.featureDesc}>
              Unlike conventional learning platforms, your boundaries are
              limitless. You can learn just about anything you want to any
              extent.
            </p>
          </div>
        </div>
        <div className={styles.feature}>
          <div>
            <PsychologyIcon className={styles.featureIcon} />
          </div>
          <div className={styles.featureDetails}>
            <h2 className={styles.featureTitle}>Focus on Understanding</h2>
            <p className={styles.featureDesc}>
              Rather than just gathering information, Simesta ensures that you
              really understand and engage with what you are learning.
            </p>
          </div>
        </div>
      </div>

      {/* How it Works */}
      <h2 className={styles.subHeaderText}>How it works</h2>
      <div className={styles.worksContainer}>
        <div className={styles.phoneImgCon}>
          <Image
            alt="phone"
            className={styles.phoneImg}
            src={IMAGES.phone}
            width={1000}
            height={1000}
          />
        </div>
        <div className={styles.workingPoints}>
          <div className={styles.point}>
            <div className={styles.pointDetail}>
              <h2 className={styles.pointTitle}>Create an account</h2>
              <p className={styles.pointDesc}>
                Create an account with your email in very few steps.
              </p>
            </div>
          </div>
          <div className={styles.point}>
            <div className={styles.pointDetail}>
              <h2 className={styles.pointTitle}>Let Simesta AI know you</h2>
              <p className={styles.pointDesc}>
                Have an interactive chat session with Simesta AI and it is able
                to evaluate how you learn on a basic level.
              </p>
            </div>
          </div>
          <div className={styles.point}>
            <div className={styles.pointDetail}>
              <h2 className={styles.pointTitle}>Start learning</h2>
              <p className={styles.pointDesc}>
                You're ready! You can create a course on anything you want to
                learn and start your personalised learning journey.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Waitlist Form */}
      <h2 id="join" className={styles.subHeaderText}>
        Join the Community
      </h2>
      <p className={styles.descriptionText}>
        Be among the first learners that experience a new dawn in their learning
        journey.
      </p>
      <form className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter your name"
          value={formValue.name}
          onChange={(e) => setValue({ ...formValue, name: e.target.value })}
        />
        <input
          className={styles.input}
          type="phone"
          placeholder="Enter your phone number"
          value={formValue.phone}
          onChange={(e) => setValue({ ...formValue, phone: e.target.value })}
        />
        <input
          className={styles.input}
          type="email"
          placeholder="Enter your email"
          value={formValue.email}
          onChange={(e) => setValue({ ...formValue, email: e.target.value })}
        />
        <div className={styles.formBtnCon}>
          <button
            onClick={handleSubmit}
            type="button"
            className={styles.whiteBtn}
          >
            Join Simesta community
          </button>
        </div>
      </form>

      {/* Footer */}
      <footer className={styles.footerCon}>
        <div className={styles.socials}>
          <Link href={"/"}>
            <XIcon className={styles.socialIcon} />
          </Link>
          <Link href={"/"}>
            <LinkedInIcon className={styles.socialIcon} />
          </Link>
        </div>
        <p className={styles.footerCopyRight}>
          Simesta AI &copy; 2024, All rights reserved.
        </p>
      </footer>
      <ToastContainer />
    </div>
  );
}
