import { useFormContext } from "react-hook-form";
import { HotelFormData } from ".";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
      <div className="flex gap-5 p-6 bg-gray-300">
        <label className="text-gray-700 text-sm font-bold flex-1">
          Adults
          <input
            type="number"
            className="border rounded w-full py-1 px-2 font-normal flex-1"
            {...register("adultCount", {
              required: "This field is required",
            })}
            min={1}
          />
          {errors.adultCount && (
            <span className="text-red-500 font-bold text-sm">
              {errors.adultCount.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Children
          <input
            type="number"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("childCount", {
              required: "This field is required",
            })}
            min={0}
          />
          {errors.childCount && (
            <span className="text-red-500 font-bold text-sm">
              {errors.childCount.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestsSection;
