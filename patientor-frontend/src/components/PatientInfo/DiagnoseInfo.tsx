const DiagnoseInfo = ({ code, name }: { code: string, name: string | undefined }) => {
  return (
    <li>
      {code} {name}
    </li>
  );
};

export default DiagnoseInfo;