import { useEffect, useMemo, useState } from "react";
import { convertGender } from "../../helper";

export default function BuyAssetStep2({ employees, onChange, ...props }) {
  const [empID, setEmpID] = useState(props.empID);
  const [toggle, setToggle] = useState(false);
  const [empEmail, setEmpEmail] = useState(props.empEmail);
  const [search, setSearch] = useState("");

  const renderedEmp = useMemo(() => {
    if (search === "") return employees.slice(0, 5);
    return employees
      .filter((emp) => emp.id.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 5);
  }, [employees, search]);

  const selectedEmp = useMemo(() => {
    if (!empID) return undefined;
    return employees.find((emp) => emp.id === empID);
  }, [empID, employees]);

  const onChangeEmp = (emp) => {
    setEmpID(emp);
    setToggle(false);
    setSearch("");
  };

  const empName = useMemo(() => {
    if (!selectedEmp) return "Nama Karyawan";
    return selectedEmp.name;
  }, [selectedEmp]);

  const empTitle = useMemo(() => {
    if (!selectedEmp) return "Posisi Karyawan";
    return selectedEmp.title;
  }, [selectedEmp]);

  const empSex = useMemo(() => {
    if (!selectedEmp) return "Gender Karyawan";
    return convertGender(selectedEmp.gender);
  }, [selectedEmp]);

  const empJoin = useMemo(() => {
    if (!selectedEmp) return "Tahun Bergabung";
    return selectedEmp.joinYear;
  }, [selectedEmp]);

  useEffect(() => {
    onChange({
      empID,
      empEmail,
    });
  }, [empID, empEmail, onChange]);

  return (
    <div className="w-full bg-gray-400 bg-opacity-20 p-2 lg:p-4 xl:p-6 rounded-lg flex flex-col gap-4 lg:gap-6">
      <div className="w-full relative">
        <label
          htmlFor="employee-id"
          className="block w-full text-gray-400 text-sm lg:text-md xl:text-lg"
        >
          Nomor Induk Karyawan*
        </label>
        <button
          id="employee-id"
          className="w-full text-white bg-gray-400 text-md lg:text-lg xl:text-xl rounded p-2 text-left flex items-center justify-between"
          onClick={() => setToggle((prev) => !prev)}
        >
          <p>{empID ? empID : "Masukkan NIP Karyawan"}</p>
          <p>&#x25BC;</p>
        </button>
        {toggle && (
          <div className="w-full block bg-gray-400 text-md lg:text-lg xl:text-xl rounded p-2 text-left absolute mt-2 z-10">
            <input
              type="text"
              value={search}
              className="w-full block bg-white text-gray-400 text-md lg:text-lg xl:text-xl rounded p-2"
              placeholder="Cari ID"
              onChange={(e) => setSearch(e.target.value)}
            />
            {renderedEmp.map((emp) => (
              <p
                key={`empOpt-${emp.id}`}
                className="mt-2"
                onClick={() => onChangeEmp(emp.id)}
              >
                {emp.id}
              </p>
            ))}
          </div>
        )}
      </div>
      <div className="w-full">
        <label
          htmlFor="name"
          className="block w-full text-gray-400 text-sm lg:text-md xl:text-lg"
        >
          Nama Karyawan
        </label>
        <p
          id="name"
          className="w-full text-white bg-gray-500 text-md lg:text-lg xl:text-xl rounded p-2 text-left flex items-center justify-between"
        >
          {empName}
        </p>
      </div>
      <div className="w-full">
        <label
          htmlFor="position"
          className="block w-full text-gray-400 text-sm lg:text-md xl:text-lg"
        >
          Posisi Karyawan
        </label>
        <p
          id="position"
          className="w-full text-white bg-gray-500 text-md lg:text-lg xl:text-xl rounded p-2 text-left flex items-center justify-between"
        >
          {empTitle}
        </p>
      </div>
      <div className="w-full grid grid-cols-2 gap-6">
        <div className="w-full">
          <label
            htmlFor="sex"
            className="block w-full text-gray-400 text-sm lg:text-md xl:text-lg"
          >
            Gender Karyawan
          </label>
          <p
            id="sex"
            className="w-full text-white bg-gray-500 text-md lg:text-lg xl:text-xl rounded p-2 text-left flex items-center justify-between"
          >
            {empSex}
          </p>
        </div>
        <div className="w-full">
          <label
            htmlFor="join"
            className="block w-full text-gray-400 text-sm lg:text-md xl:text-lg"
          >
            Bergabung Sejak
          </label>
          <p
            id="join"
            className="w-full text-white bg-gray-500 text-md lg:text-lg xl:text-xl rounded p-2 text-left flex items-center justify-between"
          >
            {empJoin}
          </p>
        </div>
      </div>
      <div className="w-full">
        <label
          htmlFor="email"
          className="block w-full text-gray-400 text-sm lg:text-md xl:text-lg"
        >
          Email Kantor*
        </label>
        <input
          id="email"
          type="email"
          className="w-full text-white bg-gray-400 placeholder-white text-md lg:text-lg xl:text-xl rounded p-2 text-left flex items-center justify-between"
          placeholder="Email Karyawan"
          value={empEmail}
          onChange={(e) => setEmpEmail(e.target.value)}
        />
      </div>
    </div>
  );
}
