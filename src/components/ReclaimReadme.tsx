import Image from "next/image";
import { Tx } from "./Tx";

const situations = [
  {
    en: ["Quit smoking (100+ lifetime cigarettes, now not at all)", "Returning to smoking"],
    bn: ["ধূমপান ছেড়েছেন (জীবনে ১০০+ সিগারেট, এখন একদমই না)", "আবার ধূমপানে ফেরা"],
  },
  {
    en: ["Smoke every day or some days", "Stopping smoking"],
    bn: ["প্রতিদিন বা মাঝে মাঝে ধূমপান করেন", "ধূমপান ছেড়ে দেওয়া"],
  },
  {
    en: ["Fewer than 100 lifetime cigarettes", "Becoming a regular smoker"],
    bn: ["জীবনে ১০০টির কম সিগারেট", "নিয়মিত ধূমপায়ী হয়ে ওঠা"],
  },
];

const results = [
  ["Former → return", "0.820", "26.6%", "19.4–23.3%"],
  ["Current → stopping", "0.781", "30.3%", "19.0–26.2%"],
  ["Never-established → regular smoker", "0.771", "6.9%", "6.3–7.6%"],
];

const features = [
  {
    en: "Four profile questions route you to the right model, and the question list adapts (last-cigarette time only for former smokers; cigarettes per day and time to first cigarette only for current smokers).",
    bn: "চারটি প্রোফাইল-প্রশ্ন সঠিক মডেল বেছে নেয় এবং প্রশ্নের তালিকা মানিয়ে নেয় (শেষ সিগারেটের সময় শুধু সাবেক ধূমপায়ীদের জন্য; দিনে কতটি সিগারেট ও প্রথম সিগারেটের সময় শুধু বর্তমান ধূমপায়ীদের জন্য)।",
  },
  {
    en: "Cumulative probability at every horizon that beat a no-input baseline on validation (12, 18, 24, 36, 48 and 60 months), each with a 95% uncertainty range from 100 bootstrap refits.",
    bn: "যে প্রতিটি সময়সীমা যাচাইয়ে ইনপুটহীন বেসলাইনকে ছাড়িয়েছে (১২, ১৮, ২৪, ৩৬, ৪৮ ও ৬০ মাস) তার জন্য সমষ্টিগত সম্ভাবনা, সঙ্গে ১০০টি বুটস্ট্র্যাপ রিফিট থেকে ৯৫% অনিশ্চয়তার পরিসর।",
  },
  {
    en: "A relative level, exact Shapley contributing factors grouped by input, and a held-out evidence panel with ROC-AUC, Brier score and the observed-risk range.",
    bn: "আপেক্ষিক স্তর, ইনপুট-গ্রুপ অনুযায়ী সঠিক Shapley অবদানকারী কারণ, এবং ROC-AUC, Brier স্কোর ও পর্যবেক্ষিত ঝুঁকির পরিসরসহ হেল্ড-আউট প্রমাণ-প্যানেল।",
  },
  {
    en: "No result when the respondent is under 18, the profile can't be routed, answers contradict each other, or too few questions are answered. Nothing is forced through the wrong model.",
    bn: "১৮ বছরের কম বয়স, প্রোফাইল রুট করা না গেলে, পরস্পরবিরোধী উত্তর বা খুব কম উত্তর থাকলে কোনো ফলাফল দেখানো হয় না। ভুল মডেলের মধ্য দিয়ে কিছুই জোর করে চালানো হয় না।",
  },
];

const repoMap = [
  ["app/, run_app.py", "Streamlit UI and checked launcher", "ইউজার ইন্টারফেস ও যাচাইকৃত লঞ্চার"],
  ["src/path_project/survival.py, study.py", "Survival model, metrics, runtime loader, explanations", "সারভাইভাল মডেল, মেট্রিক, রানটাইম লোডার, ব্যাখ্যা"],
  ["src/path_project/study_training.py", "Cohorts, split, fitting, evaluation (three populations)", "কোহর্ট, বিভাজন, ফিটিং, মূল্যায়ন (তিন জনগোষ্ঠী)"],
  ["src/path_project/assessment.py, final_inputs.py", "App answer encoding and suppression rules", "উত্তর এনকোডিং ও ফলাফল-দমনের নিয়ম"],
  ["configs/longitudinal_v2_4.json", "Study configuration", "গবেষণার কনফিগারেশন"],
  ["artifacts/longitudinal_v2_4/model.json", "Fitted model (plain JSON, no participant rows)", "ফিটেড মডেল (সাধারণ JSON, অংশগ্রহণকারীর ডেটা নেই)"],
  ["reports/longitudinal_v2_4/", "Aggregate results, manifest, verification", "সমষ্টিগত ফলাফল, ম্যানিফেস্ট, যাচাই"],
  ["tests/", "36 default tests; --research-tests adds historical ones", "৩৬টি ডিফল্ট টেস্ট; --research-tests পুরোনোগুলো যোগ করে"],
];

export function ReclaimReadme() {
  return (
    <section className="readme" aria-labelledby="readme-title">
      <h2 id="readme-title">
        <Tx en="README" bn="README" />
      </h2>
      <div className="readme-body">
        <h3>
          <Tx en="Reclaim — Smoking Return Outlook" bn="Reclaim — ধূমপানে ফেরার পূর্বাভাস" />
        </h3>
        <p>
          <Tx
            en={
              <>
                A Python/Streamlit research application (CSE366) that estimates, for any adult, the chance of the
                next smoking transition using the Population Assessment of Tobacco and Health (PATH) Study adult
                files, waves 1–8. Each situation has its own model: an interval-censored survival model with 100
                bootstrap refits, stored as plain JSON with no pickle.
              </>
            }
            bn={
              <>
                CSE366-এর একটি Python/Streamlit গবেষণা-অ্যাপ, যা Population Assessment of Tobacco and Health
                (PATH) Study-র প্রাপ্তবয়স্ক ফাইল (ওয়েভ ১–৮) ব্যবহার করে যেকোনো প্রাপ্তবয়স্কের পরবর্তী ধূমপান-পরিবর্তনের
                সম্ভাবনা অনুমান করে। প্রতিটি পরিস্থিতির নিজস্ব মডেল আছে: ১০০টি বুটস্ট্র্যাপ রিফিটসহ ইন্টারভাল-সেন্সরড
                সারভাইভাল মডেল, যা pickle ছাড়া সাধারণ JSON হিসেবে রাখা।
              </>
            }
          />
        </p>
        <div className="readme-table">
          <table>
            <thead>
              <tr>
                <th><Tx en="Your situation" bn="আপনার পরিস্থিতি" /></th>
                <th><Tx en="Chance estimated" bn="যে সম্ভাবনা অনুমান করা হয়" /></th>
              </tr>
            </thead>
            <tbody>
              {situations.map((s) => (
                <tr key={s.en[0]}>
                  <td><Tx en={s.en[0]} bn={s.bn[0]} /></td>
                  <td><Tx en={s.en[1]} bn={s.bn[1]} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3>
          <Tx en="Application preview" bn="অ্যাপের প্রিভিউ" />
        </h3>
        <div className="readme-shots">
          <figure>
            <Image
              src="/images/reclaim/image4.webp"
              alt="Completed outlook from a fictional recent-quit profile"
              width={1440}
              height={1000}
              sizes="(min-width: 1180px) 700px, 100vw"
            />
            <figcaption>
              <Tx
                en="Real local Streamlit output from the included trained bundle, using the built-in fictional recent-quit example. Probabilities are research estimates, not a known outcome or a clinical assessment."
                bn="অন্তর্ভুক্ত ট্রেইনড বান্ডল থেকে পাওয়া আসল Streamlit আউটপুট, বিল্ট-ইন কাল্পনিক সদ্য-ছাড়া উদাহরণসহ। সম্ভাবনাগুলো গবেষণাভিত্তিক অনুমান, জানা ফলাফল বা ক্লিনিক্যাল মূল্যায়ন নয়।"
              />
            </figcaption>
          </figure>
          <figure className="readme-mobile">
            <Image
              src="/images/reclaim/image5.webp"
              alt="Responsive outlook on a 390-pixel wide viewport"
              width={390}
              height={844}
              sizes="(min-width: 720px) 280px, 70vw"
            />
            <figcaption>
              <Tx en="The same assessment at a 390-pixel width." bn="একই মূল্যায়ন ৩৯০ পিক্সেল প্রস্থে।" />
            </figcaption>
          </figure>
        </div>
        <div className="readme-shots readme-pair">
          <figure>
            <Image
              src="/images/reclaim/image1.webp"
              alt="Probability timeline with uncertainty band"
              width={1440}
              height={1000}
              sizes="(min-width: 1180px) 450px, 100vw"
            />
            <figcaption>
              <Tx en="Probability timeline with the 95% uncertainty band" bn="৯৫% অনিশ্চয়তা-ব্যান্ডসহ সম্ভাবনার সময়রেখা" />
            </figcaption>
          </figure>
          <figure>
            <Image
              src="/images/reclaim/image2.webp"
              alt="Exact Shapley contributing factors by input group"
              width={1440}
              height={1000}
              sizes="(min-width: 1180px) 450px, 100vw"
            />
            <figcaption>
              <Tx en="Contributing factors by input group" bn="ইনপুট-গ্রুপ অনুযায়ী অবদানকারী কারণ" />
            </figcaption>
          </figure>
        </div>

        <h3>
          <Tx en="What the app shows" bn="অ্যাপ যা দেখায়" />
        </h3>
        <ul className="readme-list">
          {features.map((f) => (
            <li key={f.en}>
              <Tx en={f.en} bn={f.bn} />
            </li>
          ))}
        </ul>

        <h3>
          <Tx en="Headline results (held-out, 36 months)" bn="প্রধান ফলাফল (হেল্ড-আউট, ৩৬ মাস)" />
        </h3>
        <div className="readme-table">
          <table>
            <thead>
              <tr>
                <th><Tx en="Model" bn="মডেল" /></th>
                <th>ROC-AUC</th>
                <th><Tx en="Mean estimate" bn="গড় অনুমান" /></th>
                <th><Tx en="Observed-risk range" bn="পর্যবেক্ষিত ঝুঁকির পরিসর" /></th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r[0]}>
                  {r.map((c) => (
                    <td key={c}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          <Tx
            en="For former and current smokers the mean estimate at 36+ months sits above the simple observed-risk range, so absolute percentages for those groups may be somewhat high (rankings are more reliable) and the app says so. Personal confidence, exact timing and clinical use are not validated. Months are approximate (wave midpoints)."
            bn="সাবেক ও বর্তমান ধূমপায়ীদের ক্ষেত্রে ৩৬+ মাসের গড় অনুমান সাধারণ পর্যবেক্ষিত ঝুঁকির পরিসরের ওপরে থাকে, তাই এই গোষ্ঠীগুলোর পরম শতাংশ কিছুটা বেশি হতে পারে (র‍্যাঙ্কিং বেশি নির্ভরযোগ্য) এবং অ্যাপ সেটা জানায়। ব্যক্তিগত আস্থা, সুনির্দিষ্ট সময় ও ক্লিনিক্যাল ব্যবহার যাচাই করা হয়নি। মাসগুলো আনুমানিক (ওয়েভের মধ্যবিন্দু)।"
          />
        </p>

        <h3>
          <Tx en="Run" bn="চালানো" />
        </h3>
        <p>
          <Tx
            en="Python 3.13 (tested 3.13.5). The launcher first checks the model hashes, numpy/pandas versions and ten fictional regression profiles. No raw data, GPU, API key or scikit-learn is needed. Open http://127.0.0.1:8501 once it starts."
            bn="Python 3.13 (৩.১৩.৫-এ পরীক্ষিত)। লঞ্চার প্রথমে মডেল হ্যাশ, numpy/pandas সংস্করণ ও দশটি কাল্পনিক রিগ্রেশন প্রোফাইল যাচাই করে। কাঁচা ডেটা, GPU, API কী বা scikit-learn লাগে না। চালু হলে http://127.0.0.1:8501 খুলুন।"
          />
        </p>
        <pre className="readme-code">
          <code>{`python3.13 -m venv .venv
.venv/bin/python -m pip install -r requirements-app.txt
.venv/bin/python run_app.py            # Windows: .venv\\Scripts\\python.exe run_app.py

# tests / training
pip install -r requirements-test.txt
python -m pytest -q -p no:cacheprovider`}</code>
        </pre>

        <h3>
          <Tx en="Reproduce the study" bn="গবেষণা পুনরুৎপাদন" />
        </h3>
        <p>
          <Tx
            en="Needs the PATH files, which are not in Git. Retraining reproduces model.json byte-for-byte, and a changed protocol needs a new version name; the script refuses to overwrite an existing run."
            bn="PATH ফাইল দরকার, যা Git-এ নেই। পুনরায় ট্রেনিং করলে model.json বাইট-বাই-বাইট একই হয়, আর প্রোটোকল বদলালে নতুন সংস্করণ-নাম লাগে; স্ক্রিপ্ট আগের রান ওভাররাইট করতে অস্বীকার করে।"
          />
        </p>
        <pre className="readme-code">
          <code>{`.venv/bin/python scripts/train_longitudinal_v2_4.py
.venv/bin/python scripts/verify_longitudinal_v2_4.py --rebuild-cohort`}</code>
        </pre>

        <h3>
          <Tx en="Verification" bn="যাচাই" />
        </h3>
        <p>
          <Tx
            en="Portfolio verification on 16 November 2026 passed scripts/verify_runtime.py (10 fictional profiles) and all 36 active tests with the pinned requirements. The application was run and captured in desktop and mobile Chromium. No model was refitted and no participant data or production services were used. Answers stay in session memory; there is no external prediction API."
            bn="১৬ নভেম্বর ২০২৬-এর পোর্টফোলিও যাচাইয়ে পিন-করা রিকোয়ারমেন্ট দিয়ে scripts/verify_runtime.py (১০টি কাল্পনিক প্রোফাইল) ও সব ৩৬টি সক্রিয় টেস্ট পাস করেছে। অ্যাপটি চালিয়ে ডেস্কটপ ও মোবাইল Chromium-এ ক্যাপচার করা হয়েছে। কোনো মডেল রিফিট করা হয়নি এবং কোনো অংশগ্রহণকারীর ডেটা বা প্রোডাকশন সার্ভিস ব্যবহার হয়নি। উত্তর সেশন-মেমরিতেই থাকে; কোনো বাহ্যিক পূর্বাভাস API নেই।"
          />
        </p>

        <h3>
          <Tx en="Repository map" bn="রিপোজিটরির মানচিত্র" />
        </h3>
        <div className="readme-table">
          <table>
            <thead>
              <tr>
                <th><Tx en="Path" bn="পাথ" /></th>
                <th><Tx en="Purpose" bn="উদ্দেশ্য" /></th>
              </tr>
            </thead>
            <tbody>
              {repoMap.map(([path, en, bn]) => (
                <tr key={path}>
                  <td><code>{path}</code></td>
                  <td><Tx en={en} bn={bn} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
