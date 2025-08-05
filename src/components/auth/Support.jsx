/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Link } from 'react-router-dom';
import '../../app.css'

const Support = ({ show, onClose }) => {
  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/20 backdrop-blur-[1px]">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-white w-full max-w-md mx-4 rounded-xl p-6 shadow-xl relative"
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X />
            </button>

            <div className="text-center space-y-2">
              <h2 className="text-3xl font-semibold lg:text-4xl">
                Need help?
              </h2>
              <p className="lg:text-lg text-[var(--color-neutral)]">
                Explore the following support options
              </p>
            </div>

            <section className="w-full h-[400px] flex justify-center items-center">
              <div className="flex flex-col gap-10 w-md mx-auto lg:w-3xl">

                <div className="capitalize font-medium text-xl flex flex-col gap-4">
                  <Link
                    to={""}
                    className="py-5 px-16 text-center border-2 border-slate-100 rounded-xl hover:bg-[var(--color-primary-dark)] hover:font-bold hover:text-white transition duration-300 ease-in-out"
                  >
                    FAQ / help center
                  </Link>
                  <Link
                    to={""}
                    className="py-5 px-16 text-center border-2 border-slate-100 rounded-xl hover:bg-[var(--color-primary-dark)] hover:font-bold hover:text-white transition duration-300 ease-in-out"
                  >
                    In-App chat
                  </Link>
                  <Link
                    to={""}
                    className="py-5 px-16 text-center border-2 border-slate-100 rounded-xl hover:bg-[var(--color-primary-dark)] hover:font-bold hover:text-white transition duration-300 ease-in-out"
                  >
                    Email support
                  </Link>
                  <Link
                    to={""}
                    className="py-5 px-16 text-center border-2 border-slate-100 rounded-xl hover:bg-[var(--color-primary-dark)] hover:font-bold hover:text-white transition duration-300 ease-in-out"
                  >
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
