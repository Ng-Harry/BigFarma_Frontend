import LoadingSkeleton from "../../shared/Loader.jsx"
import {useState, useEffect} from "react";
import WalletDashboard from "./Wallet.jsx";
import History from "./History.jsx";

const WalletIndex = () => {
    
	const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("wallet");

    useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 1500);
		return () => clearTimeout(timer);
	}, []);

    if(loading) {
    return (
			<div className="flex items-center justify-center h-[70vh]">
				<LoadingSkeleton />
			</div>
		);
  } 

	return (
		<>
			<div className="w-full flex items-center justify-start p-5 "> 
				<div className="w-full lg:max-w-2xl h-full gap-10 text-center py-2 ml-10">
                   <div className="flex items-center justify-center gap-11 mb-5">
                     <button className={` w-76 h-10 flex items-center justify-center rounded-lg font-medium   ${activeTab === "wallet" ? "bg-[#016130] text-white" : "bg-white text-[#016130] border border-[#016130] hover:bg-gray-100" }`} onClick={() => setActiveTab("wallet")}>
                        Dashboard
                    </button>
                    <button className={` w-76 h-10 flex items-center justify-center rounded-lg font-medium  ${activeTab === "history" ? "bg-[#016130] text-white" : "bg-white text-[#016130] border border-[#016130] hover:bg-gray-100" }`} onClick={() => setActiveTab("history")}>
                        Transaction History
                    </button>
                   </div>
                    <div className="mt-8 mx-2">
                        {activeTab === "wallet" ? <WalletDashboard/> : <History/>}
                    </div>
                </div>
                
			</div>
		</>
	);
  
}

export default WalletIndex