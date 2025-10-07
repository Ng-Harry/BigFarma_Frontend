import React from "react";
import Input from "../../shared/Input";
import { Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import SuccessModal from "./SuccessModal";
import { endpoints } from "../../config/endpoints";
import { axios } from "../../../lib/axios";
import axiosDefault from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const CreateGroupModal = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    groupName: "",
    groupLocation: "",
    items: "",
    Quantity: "",
    Description: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = {
      groupName: formData.groupName.trim(),
      groupLocation: formData.groupLocation.trim(),
      items: formData.items.trim(),
      Quantity: String(formData.Quantity).trim(),
      Description: formData.Description.trim(),
    };

    if (
      trimmed.groupName &&
      trimmed.groupLocation &&
      trimmed.items &&
      trimmed.Quantity &&
      trimmed.Description
    ) {
      // const payload = {
      //   group_name: trimmed.groupName,
      //   group_description: trimmed.Description,
      //   group_location: trimmed.groupLocation,
      //   product_id: Number(trimmed.items),
      //   target_quantity: trimmed.Quantity,
      //   quantity_unit: "kg",
      //     "target_quantity_numeric": 1,
      // };
    const payload = {
  group_name: trimmed.groupName,
  group_description: trimmed.Description,
  group_location: trimmed.groupLocation,
  product_id: trimmed.items,
  target_quantity: trimmed.Quantity,
  target_quantity_numeric: 1,
  quantity_unit: "kg",
  individual_contribution: 1,
  is_public: true,
  max_members: 1,
  deadline: "2025-10-07T15:22:55.210Z"
};
      try {
        const res = await axios.post(endpoints().groupBuy.list, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("BIGFARMA_ACCESS_TOKEN")}`,
          },
        });

        const data = res.data;

        // if (res.status === 200 || res.status === 201) {
        // 	toast.success(data.message || "Saved successfully!");
        // }
        toast.success(data.message || "Saved successfully!");
      } catch (error) {
        console.error("Error:", error);
        if (axiosDefault.isAxiosError(error) && error.response) {
          toast.error(error.response.data?.message || "Profile setup failed");
        } else {
          toast.error("Unable to connect to the server");
        }
      }

      toast.success("Form data is valid");
      console.log(trimmed);
      setShowSuccess(true);
    } else {
      toast.error("Form data is invalid");
      console.log(trimmed);
    }
  };

  return (
    <section className="max-w-4xl h-screen rounded-l-lg shadow-xl">
      <div className=" max-w-4xl h-auto p-5">
        <div className="flex  flex-col items-center justify-between ">
          <h2 className="font-semibold text-2xl p-4 text-center">
            Create your group by entering the details below. Once created,
            invite members with your sharable link to begin buying together
          </h2>
          <form
            className="w-full border border-white flex flex-col space-y-7"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="group-name">Group Name</label>
              <Input
                type="text"
                id="group-name"
                placeholder="Text input."
                className="placeholder:text-[#98A2B3]"
                value={formData.groupName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    groupName: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label htmlFor="group-location">Group Location</label>
              <Input
                type="text"
                id="group-location"
                placeholder="Text input."
                className="placeholder:text-[#98A2B3]"
                value={formData.groupLocation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    groupLocation: e.target.value,
                  })
                }
              />
            </div>

            <div className="relative">
              <Search
                size={20}
                className="absolute top-[38px] left-3 text-gray-400"
              />

              <div className="relative">
                <label
                  htmlFor="item-to-purchase"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Item to Purchase
                </label>

                <select
                  id="item-to-purchase"
                  className="pl-10 pr-10 border border-[#DDD5DD] p-3 rounded-lg w-full 
             focus:ring-1 focus:ring-[#016130] 
                 outline-none appearance-none"
                  value={formData.items}
                  onChange={(e) =>
                    setFormData({ ...formData, items: e.target.value })
                  }
                >
                  <option value="">Select product</option>
                  <option value="1">Rice</option>
                  <option value="2">Beans</option>
                  <option value="3">Maize</option>
                </select>

                <ChevronDown
                  size={18}
                  className="pointer-events-none absolute top-[65%] right-3 -translate-y-1/2 text-gray-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="purchase-quantity">Purchase Quantity</label>
              <Input
                type="number"
                id="purchase-quantity"
                placeholder="Number input.."
                className="placeholder:text-[#98A2B3]"
                value={formData.Quantity}
                inputMode="numeric"
                min="0"
                step="1"
                onChange={(e) => {
                  const numericOnly = e.target.value.replace(/\D/g, "");
                  setFormData({ ...formData, Quantity: numericOnly });
                }}
              />
            </div>

            <div className=" flex flex-col">
              <label htmlFor="group-description"> Group Description</label>
              <textarea
                name="group-description"
                id="group-description"
                className="h-25 border border-[#DDD5DD] p-3 rounded-lg placeholder:text-[#98A2B3] resize-none focus:border-[#01ae56] focus:ring-1 focus:ring-[#016130] outline-none"
                placeholder="Text area...."
                value={formData.Description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    Description: e.target.value,
                  })
                }
              ></textarea>
            </div>

            <div className="flex justify-start  gap-3">
              <button
                onClick={() => navigate(-1)}
                type="button"
                className="w-33 text-[#016130] border border-[#016130] inline-flex items-center justify-center gap-[3px] rounded-[8px] py-3 font-medium transition-colors focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-33 bg-[#016130] hover:bg-[#003F1F] inline-flex items-center justify-center gap-[3px] rounded-[8px] py-3 font-medium transition-colors focus:outline-none text-white"
              >
                Continue
              </button>
            </div>
          </form>
          {showSuccess && (
            <SuccessModal onClose={() => setShowSuccess(false)} />
          )}
        </div>
      </div>
    </section>
  );
};

export default CreateGroupModal;
