import { useState } from "react"
import { Camera } from "lucide-react"

export const Report = () => {
  const [image, setImage] = useState(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(URL.createObjectURL(file))
    }
  }

  return (
    <div>
      <section className="w-full bg-white py-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-5 text-gray-900">Report a pothole</h2>
          <p className="text-xl mb-6">Help improve our roads by reporting a pothole in your area</p>
          <div className="shadow-lg width-500px">
          <div className="text-left max-w-md mx-auto">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Photo of Pothole
            </label>

            <label
              htmlFor="upload-photo"
              className="flex flex-col items-center justify-center border-2 border-dashed border-blue-300 rounded-lg h-40 cursor-pointer hover:bg-blue-50 transition"
            >
              {image ? (
                <img
                  src={image}
                  alt="Preview"
                  className="h-full w-full object-cover rounded-lg"
                />
              ) : (
                <>
                  <Camera className="h-8 w-8 text-gray-400" />
                  <span className="mt-2 text-sm text-gray-500">Upload a photo</span>
                </>
              )}
              <input
                id="upload-photo"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <p className=" font mt-4 text-bold-900">Location</p>
            <textarea rows="1" className="shadow-md min-h-[1rem] max-h-[3rem] rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"  type="text" placeholder="Enter location or address of pothole"/>
            <p className="text-sm text-gray-600">Example:MG road,kormangala etc </p>

            <p className="mt-4 text-bold-900">Description</p>
            <div className="flex flex-col">
            <textarea
                rows="4"
                className="w-full resize-y mb-6 min-h-[3rem] max-h-[12rem] border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex items-center justify-end">
                <button className="rounded-md bg-blue-600 text-white mb-4 p-2 px-8 hover:bg-blue-700 text-right">Report</button>
            </div>
            </div>
          </div>
          
          </div>
        </div>
      </section>
    </div>
  )
}
