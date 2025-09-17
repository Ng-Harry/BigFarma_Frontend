import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import "../../App.css";
//==================== Support Icons ====================
import { FaRegCommentDots } from "react-icons/fa";
import {
  MdOutlineLiveHelp,
  MdOutlinePhone,
  MdOutlineEmail,
} from "react-icons/md";

const Support = ({ show, onClose }) => {
  return (
    <AnimatePresence>
      {show && (
        <div className="">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-white rounded-xl p-6 shadow-xl px-4"
          >
            <button
              onClick={onClose}
              className="absolute top-3 left-3 text-gray-500 hover:text-black"
            >
              <X />
            </button>

            <div className="text-center space-y-1 pb-5">
              <h2 className="text-3xl font-semibold lg:text-2xl">Need help?</h2>
              <p className="lg:text-md text-[var(--color-neutral)]">
                Explore the following support options
              </p>
            </div>

            <section className="w-fit flex justify-center items-center ">
              <div className="flex flex-col gap-10 ">
                <div className="capitalize font-medium text-xl flex flex-col gap-4 w-[350px]">
                  <Link
                    to={""}
                    className="py-3 px-16  text-center text-sm text-[var(--color-primary)] border-1 border-[var(--color-primary)] rounded-md hover:bg-gray-100 transition duration-300 ease-in-out flex items-center justify-center"
                  >
                    <MdOutlineLiveHelp
                      size={22}
                      className="text-[var(--color-primary)] mr-2"
                    />
                    FAQ / help center
                  </Link>
                  <Link
                    to={""}
                    className="py-3 px-16  text-center text-sm text-[var(--color-primary)] border-1 border-[var(--color-primary)] rounded-md hover:bg-gray-100 transition duration-300 ease-in-out flex items-center justify-center"
                  >
                    <FaRegCommentDots
                      size={22}
                      className="text-[var(--color-primary)] mr-2"
                    />
                    In-App chat
                  </Link>
                  <Link
                    to={""}
                    className="py-3 px-16  text-center text-sm text-[var(--color-primary)] border-1 border-[var(--color-primary)] rounded-md hover:bg-gray-100 transition duration-300 ease-in-out flex items-center justify-center"
                  >
                    <MdOutlineEmail
                      size={22}
                      className="text-[var(--color-primary)] mr-2"
                    />
                    Email support
                  </Link>
                  <Link
                    to={""}
                    className="py-3 px-16  text-center text-sm text-[var(--color-primary)] border-1 border-[var(--color-primary)] rounded-md hover:bg-gray-100 transition duration-300 ease-in-out flex items-center justify-center"
                  >
                    <MdOutlinePhone
                      size={22}
                      className="text-[var(--color-primary)] mr-2"
                    />
                    Phone hotline
                  </Link>
                </div>
              </div>
            </section>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Support;
