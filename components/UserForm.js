import { BiSolidSend } from "react-icons/bi";
import InputText from "@/components/form/InputText";
import CustomSelect from "@/components/form/CustomSelect";
import { AI_SOURCES, DISEASES, FITNESS_LEVELS, GENDERS, GOALS, TIMELIMIT } from "@/constants";
import toast from "react-hot-toast";

const GENERATE_URL = "/api/generate";

export default function UserForm({ setData, setLoading, loading }) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = {
      model: event.target.elements.model.value,
      height: event.target.elements.height.value,
      weight: event.target.elements.weight.value,
      age: event.target.elements.age.value,
      gender: event.target.elements.gender.value,
      fitnessLevel: event.target.elements.fitnessLevel.value,
      goal: event.target.elements.goal.value,
      diseases:event.target.elements.diseases.value,
      timelimit:event.target.elements.timelimit.value,
    };

    let response = await fetch(GENERATE_URL, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (response.ok) {
      response = await response.json();
      setLoading(false);
      setData(response.result);
      toast.success("Workout generated!");
    } else {
      response = await response.json();
      setLoading(false);
      toast.error(response.error.message);
    }
  };

  return (
    <form
      className="w-full my-10 mt-6 p-6 bg-gradient-to-br from-[#F0F4F8] to-[#E2E8F0] border border-[#CBD5E1] shadow-xl rounded-lg"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      {/* AI Model Selection */}
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full md:w-1/3 px-3">
          <CustomSelect id="model" label="AI Source" values={AI_SOURCES} />
        </div>
      </div>

      <hr className="border-[#94A3B8] my-5" />

      {/* Physical Attributes */}
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full md:w-1/3 px-3">
          <InputText label="Height (cm)" id="height" />
        </div>
        <div className="w-full md:w-1/3 px-3">
          <InputText label="Weight (kg)" id="weight" />
        </div>
        <div className="w-full md:w-1/3 px-3">
          <InputText label="Age (yr)" id="age" />
        </div>
      </div>

      {/* Dropdowns */}
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full md:w-1/3 px-3">
          <CustomSelect id="gender" label="Gender" values={GENDERS} />
        </div>
        <div className="w-full md:w-1/3 px-3">
          <CustomSelect id="fitnessLevel" label="Fitness Level" values={FITNESS_LEVELS} />
        </div>
        <div className="w-full md:w-1/3 px-3">
          <CustomSelect id="goal" label="Goal" values={GOALS} />
        </div>
        <div className="w-full md:w-1/3 px-3">
          <CustomSelect id="diseases" label="Diseases" values={DISEASES} />
        </div>
        <div className="w-full md:w-1/3 px-3">
          <CustomSelect id="timelimit" label="Time Limit" values={TIMELIMIT} />
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-gradient-to-r from-[#4C9AFF] to-[#0052CC] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:from-[#0052CC] hover:to-[#003E99] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Please wait..." : (
            <>
              Submit <BiSolidSend className="text-lg" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
