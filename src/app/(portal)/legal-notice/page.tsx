import PagePadding from "../../../components/PagePadding";

const LegalNoticePage = () => {
  return (
    <PagePadding>
      <div className="gap-2 flex flex-col">
        <h2 className="text-4xl font-bold cursor-default mb-2">Imprint</h2>
        <p>Address: Sportplatzstraße 4 84051</p>
        <p>Owner: Daniel Rubin</p>
        <p>Tel: +49 160 671 2187</p>
        <p>Email: contact@daniel-rubin.de</p>
      </div>
    </PagePadding>
  );
};

export default LegalNoticePage;
