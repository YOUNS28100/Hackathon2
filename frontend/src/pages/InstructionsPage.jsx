import Reactplayer from "react-player/youtube";
import { useState } from "react";
import { motion as m } from "framer-motion";
import Registration from "../components/Registration";
import exhibit from "../assets/pictures/exhibit.jpg";
import addOne from "../assets/pictures/LOREAL_add.webp";
import fondationImg from "../assets/pictures/foundationguide-loreal-square.jpg";

export default function RegistrationPage() {
  const [isStarted, setIsStarted] = useState(false);

  const stepsArray = [
    { id: 1, visible: false },
    { id: 2, visible: false },
    { id: 3, visible: false },
    { id: 4, visible: false },
    { id: 5, visible: false },
    { id: 6, visible: false },
    { id: 7, visible: false },
    { id: 8, visible: false },
  ];
  const [visible, setVisible] = useState(stepsArray);

  const startForm = (id) => {
    const arrayId = parseInt(id, 10);
    const index = arrayId - 1;
    setVisible(visible.toSpliced(index, 1, { id: arrayId, visible: true }));
    setIsStarted(true);
  };

  return (
    <div className=" mt-24 flex flex-col justify-between align-middle">
      {!isStarted ? (
        <div className="bg-black relative pb-20">
          <div>
            <h1 className="text-white text-2xl font-cblight p-6">
              {" "}
              L'Oreal presents:
              <br />
              <m.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 3, ease: "easeInOut", delay: 4 }}
                className="mt-4 text-4xl"
              >
                Omega.
              </m.div>
            </h1>
            <div>
              <Reactplayer
                url="https://www.youtube.com/watch?v=l3deqfpSz-s"
                playing
                loop
                muted
                width={600}
                height={400}
                className="-ml-24"
              />
            </div>
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 3, ease: "easeOut", delay: 2 }}
              className="text-white mt-10 text-3xl absolute text-end text-pretty font-cblight"
            >
              {" "}
              Our lastest app that meets{" "}
              <m.p
                className=" font-extrabold text-end"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 2, ease: "easeOut", delay: 1 }}
              >
                {" "}
                your specific <br /> needs{" "}
              </m.p>
            </m.div>

            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ margin: "200px" }}
              transition={{ duration: 3, ease: "easeOut" }}
              className="mt-40"
            >
              <img src={addOne} alt="addOne" width={300} />
            </m.div>
            <div className="relative">
              <m.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ margin: "200px" }}
                transition={{ duration: 3, ease: "easeInOut" }}
                className="pb-14"
              >
                <img
                  src={fondationImg}
                  alt="addTwo"
                  width={400}
                  className="ml-12 mt-10"
                />
              </m.div>
              <m.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 1 }}
                className="text-white text-3xl absolute bottom-0 text-start text-pretty font-cblight"
              >
                {" "}
                With an integrated <b>AI</b>{" "}
                <m.p
                  className=" font-extrabold text-start"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 2 }}
                >
                  {" "}
                  we help you find <br /> your skin routine{" "}
                </m.p>
              </m.div>
            </div>

            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ margin: "400px" }}
              transition={{ duration: 3, ease: "easeInOut" }}
            >
              <Reactplayer
                url="https://www.youtube.com/watch?v=PVLKfwz1WT4"
                playing
                loop
                muted
                width={600}
                height={400}
                className="-ml-24 mt-20"
              />
            </m.div>
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ margin: "200px" }}
              transition={{ duration: 4, ease: "easeInOut" }}
            >
              <img
                src={exhibit}
                width={500}
                alt="exhibition"
                className="mt-10"
              />
            </m.div>
          </div>

          <button
            className="text-2xl active:text-silverRust bg-opacity-80 absolute bottom-28 right-20 shadow-sm shadow-slate-500 bg-zinc-950 px-10 text-white py-4"
            type="button"
            onClick={() => startForm(1)}
          >
            It starts Now
          </button>
        </div>
      ) : null}
      <div>
        <Registration setVisible={setVisible} visible={visible} />
      </div>
    </div>
  );
}
