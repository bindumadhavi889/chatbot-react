type LanguageDropdownProps = {
  selectedLanguage: string;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<string>>;
};

function LanguageDropdown({
  selectedLanguage,
  setSelectedLanguage,
}: LanguageDropdownProps) {
  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "Hindi" },
    { code: "te", label: "Telugu" },
    { code: "ta", label: "Tamil" },
    { code: "kn", label: "Kannada" },
    { code: "ml", label: "Malayalam" },
    { code: "mr", label: "Marathi" },
  ];

  return (
    <select
      value={selectedLanguage}
      onChange={(e) => setSelectedLanguage(e.target.value)}
      className="w-full px-3 py-2 rounded-xl border border-gray-300 
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}

export default LanguageDropdown;