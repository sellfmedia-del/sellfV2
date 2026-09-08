"use client";

export default function CookiePolicyClient() {
  return (
    <main className="min-h-screen bg-[#f1f0ec] pt-32 md:pt-40 pb-24 text-sellf-black">
      <div className="sellf-container max-w-4xl">
        
        <div className="mb-14 border-b border-black/15 pb-8">
          <h1 className="sellf-display text-5xl md:text-7xl mb-4">Cookie Policy</h1>
          <p className="sellf-kicker text-black/38">Sellf Media</p>
        </div>

        <div className="space-y-12 text-base md:text-lg text-black/68 leading-relaxed">
          
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-[-.035em] text-black mb-4">1. Introduction and Scope</h2>
            <p>
              This Cookie Policy has been prepared to inform the visitors of www.sellfmedia.com (the "Website") about the types of cookies used on our website, their purposes of use, and how to manage these cookies. As Sellf Media, we highly value the privacy and protection of our users' personal data.
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-[-.035em] text-black mb-4">2. What is a Cookie?</h2>
            <p>
              Cookies are small text files that are saved on your device (computer, smartphone, tablet) via your browser when you visit a website. These files are used to make the website function more efficiently, personalize the user experience, and provide analytical data to site administrators.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-sellf-black mb-6">3. Types of Cookies Used</h2>
            <p className="mb-6">The cookies used on our website are categorized below according to their functions:</p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-sellf-black/20 text-sellf-black">
                    <th className="py-4 pr-4 font-bold">Category</th>
                    <th className="py-4 pr-4 font-bold">Description</th>
                    <th className="py-4 font-bold">Duration</th>
                  </tr>
                </thead>
                <tbody className="text-base">
                  <tr className="border-b border-sellf-black/10">
                    <td className="py-4 pr-4 font-bold text-sellf-black">Mandatory Cookies</td>
                    <td className="py-4 pr-4">Required for the website to fulfill its basic functions (security, session management).</td>
                    <td className="py-4 text-sellf-grey">Session / Persistent</td>
                  </tr>
                  <tr className="border-b border-sellf-black/10">
                    <td className="py-4 pr-4 font-bold text-sellf-black">Performance & Analytics</td>
                    <td className="py-4 pr-4">Allows us to measure visitor count and traffic sources to improve site performance.</td>
                    <td className="py-4 text-sellf-grey">Persistent</td>
                  </tr>
                  <tr className="border-b border-sellf-black/10">
                    <td className="py-4 pr-4 font-bold text-sellf-black">Functional Cookies</td>
                    <td className="py-4 pr-4">Allows us to provide a more personalized service by remembering your choices (language, region, etc.).</td>
                    <td className="py-4 text-sellf-grey">Persistent</td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-4 font-bold text-sellf-black">Targeting & Advertising</td>
                    <td className="py-4 pr-4">Placed by third-party providers to show you tailored content and ads based on your interests.</td>
                    <td className="py-4 text-sellf-grey">Persistent</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-[-.035em] text-black mb-4">4. Purposes of Using Cookies</h2>
            <p className="mb-4">Sellf Media uses cookies for the following primary purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To ensure the website functions properly and securely.</li>
              <li>To analyze visitors' site usage habits and improve the user experience.</li>
              <li>To measure the effectiveness of our marketing activities and provide personalized content.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-[-.035em] text-black mb-4">5. Management and Disabling of Cookies</h2>
            <p className="mb-4">
              You have the right to control the use of cookies by changing your browser settings. If you block cookies, some features of our website may not function at full performance.
            </p>
          </div>

          <div className="pt-8 border-t border-sellf-black/10">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-[-.035em] text-black mb-4">6. Updates and Contact</h2>
            <p className="mb-4">
              This Cookie Policy may be updated from time to time to comply with changing legislative requirements or technical updates. For any questions, you can contact us:
            </p>
            <div className="flex flex-col gap-2 font-bold">
              <span>Email: <a href="mailto:team@sellfmedia.com" className="text-sellf-primary hover:underline">team@sellfmedia.com</a></span>
              <span>Location: Istanbul, Turkey</span>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}