import React from "react";
import Input from "../../shared/Input";
import { Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import SuccessModal from "./SuccessModal";

const CreateGroupModal = () => {
  const [formData, setFormData] = useState({
    groupName: "",
    groupLocation: "",
    items: "",
    Quantity: "",
    Description: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
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
              <Search size={20} className="absolute top-9.5 left-3" />
              <div className="relative">
                <label htmlFor="item-to-purchase">Item to Purchase</label>
                <Input
                  type="text"
                  id="item-to-purchase"
                  placeholder="From Marketplace items"
                  className=" pl-10 placeholder:text-[#98A2B3]"
                  value={formData.items}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      items: e.target.value,
                    })
                  }
                />
              </div>
              <ChevronDown size={18} className="absolute  top-9.5 right-4" />
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
