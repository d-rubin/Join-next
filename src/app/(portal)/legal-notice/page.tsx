import { Metadata } from "next";
import PagePadding from "../../../components/PagePadding";

export const metadata: Metadata = {
  title: "Legal Notice",
};

const LegalNoticePage = () => {
  return (
    <PagePadding>
      <div className="flex flex-col gap-4">
        <div className="gap-2 flex flex-col">
          <h2 className="text-4xl font-bold cursor-default mb-2">Imprint</h2>
          <p>Address: Sportplatzstraße 4 84051</p>
          <p>Owner: Daniel Rubin</p>
          <p>Tel: +49 160 671 2187</p>
          <p>Email: contact@daniel-rubin.de</p>
        </div>
        <section>
          <h3 className="text-2xl font-bold cursor-default">Acceptance of terms</h3>
          <p>
            By accessing and using Join (Product), you acknowledge and agree to the following terms and conditions, and
            any policies, guidelines, or amendments thereto that may be presented to you from time to time. I may update
            or change the terms and conditions from time to time without notice.
          </p>
        </section>
        <section>
          <h3 className="text-2xl font-bold cursor-default">Scope and ownership of the product</h3>
          <p>
            Join has been developed as part of my web development bootcamp at the Developer Akademie GmbH. It has an
            educational purpose and is not intended for extensive personal & business usage. As such, we cannot
            guarantee consistent availability, reliability, accuracy, or any other aspect of quality regarding this
            Product. The design of Join is owned by the Developer Akademie GmbH. Unauthorized use, reproduction,
            modification, distribution, or replication of the design is strictly prohibited.
          </p>
        </section>
        <section>
          <h3 className="text-2xl font-bold cursor-default">Proprietary rights</h3>
          <p>
            Proprietary rights Aside from the design owned by Developer Akademie GmbH, I retain all proprietary rights
            in Join, including any associated copyrighted material, trademarks, and other proprietary information.
          </p>
        </section>
        <section>
          <h3 className="text-2xl font-bold cursor-default">Use of the product</h3>
          <p>
            Join is intended to be used for lawful purposes only, in accordance with all applicable laws and
            regulations. Any use of Join for illegal activities, or to harass, harm, threaten, or intimidate another
            person, is strictly prohibited. You are solely responsible for your interactions with other users of Join.
          </p>
        </section>
        <section>
          <h3 className="text-2xl font-bold cursor-default">Disclaimer of warranties and limitation of liability</h3>
          <p>
            Join is provided "as is" without warranty of any kind, whether express or implied, including but not limited
            to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement. In no
            event will I or the Developer Akademie, be liable for any direct, indirect, incidental, special,
            consequential or exemplary damages, including but not limited to, damages for loss of profits, goodwill,
            use, data, or other intangible losses, even if we have been advised of the possibility of such damages,
            arising out of or in connection with the use or performance of Join.
          </p>
        </section>
        <section>
          <h3 className="text-2xl font-bold cursor-default">Indemnity</h3>
          <p>
            You agree to indemnify, defend and hold harmless us, the listed students, the Developer Akademie, and our
            affiliates, partners, officers, directors, agents, and employees, from and against any claim, demand, loss,
            damage, cost, or liability (including reasonable legal fees) arising out of or relating to your use of Join
            and/or your breach of this Legal Notice. For any questions or notices, please contact us at [Contact Email].
            Date: July 26, 2023
          </p>
        </section>
      </div>
    </PagePadding>
  );
};

export default LegalNoticePage;
