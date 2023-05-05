async function getData(data, setData) {
  //Fetch data from googlesheet using sheet.best
  try {
    const res = await fetch(
      "https://sheet.best/api/sheets/366902c1-4a26-4d85-a7d2-13acacb9f801"
    );
    const data = await res.json();
    setData(data);
  } catch (error) {
    console.log(error);
  }
}

export default getData;
