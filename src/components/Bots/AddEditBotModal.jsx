import { useState } from "react";
import { FaTimes, FaUpload, FaRobot } from "react-icons/fa";
import { useError } from "../../contexts/ErrorContext";

export default function AddBotModal({ show, onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    subject: "",
    grade: "",
    textbook: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setErrorForm] = useState("");
  const { setError } = useError();

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (error) setErrorForm(""); // Clear error on input change
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 10MB)
      // if (file.size > 10 * 1024 * 1024) {
      //   setError("File size must be less than 10MB");
      //   return;
      // }
      setForm(prev => ({ ...prev, textbook: file }));
      if (error) setErrorForm("");
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      subject: "",
      grade: "",
      textbook: null
    });
    setErrorForm("");
    // Reset file input
    const fileInput = document.getElementById("textbook-upload");
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!form.name.trim()) {
      setErrorForm("Bot name is required");
      return;
    }
    if (!form.subject) {
      setErrorForm("Please select a subject");
      return;
    }
    if (!form.grade) {
      setErrorForm("Please select a grade");
      return;
    }
    
    setLoading(true);
    setErrorForm("");

    try {
      await onSuccess(form); // Call parent's API function
      resetForm();
      onClose();
    } catch (err) {
      resetForm();
      onClose();
      console.log(err)
      setError(err.message || "Failed to create bot");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      resetForm();
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" 
      onClick={handleClose}
    >
      <form
        className="bg-white rounded-2xl p-6 w-full max-w-md mx-auto shadow-2xl overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FaRobot className="text-indigo-600 text-2xl" />
            <h2 className="text-2xl font-bold text-indigo-700">Create New Bot</h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Bot Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Bot Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g., Math Helper"
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Subject <span className="text-red-500">*</span>
            </label>
            <select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            >
              <option value="">Select Subject</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
              <option value="History">History</option>
              <option value="Geography">Geography</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
            </select>
          </div>

          {/* Grade */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Grade <span className="text-red-500">*</span>
            </label>
            <select
              name="grade"
              value={form.grade}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            >
              <option value="">Select Grade</option>
              {[1,2,3,4,5,6, 7, 8, 9, 10, 11, 12].map(g => (
                <option key={g} value={g.toString()}>Grade {g}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Brief description of what this bot does..."
              rows={3}
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none transition"
            />
          </div>

          {/* Textbook Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Textbook (PDF, Optional)
            </label>
            <div className="relative">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="textbook-upload"
                disabled={loading}
              />
              <label
                htmlFor="textbook-upload"
                className={`w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-400 transition flex items-center justify-center gap-2 text-gray-600 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <FaUpload />
                {form.textbook ? form.textbook.name : "Click to upload textbook"}
              </label>
            </div>
            {form.textbook && (
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-green-600">
                  ✓ {form.textbook.name} ({(form.textbook.size / 1024 / 1024).toFixed(2)} MB)
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForm(prev => ({ ...prev, textbook: null }));
                    const fileInput = document.getElementById("textbook-upload");
                    if (fileInput) fileInput.value = "";
                  }}
                  disabled={loading}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex items-start gap-2">
            <span className="text-red-500">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </span>
            ) : (
              'Create Bot'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
