"use client";
export default function Info() {
  return (
    <>
      <h1 className="text-5xl font-normal mb-8">Settings</h1>
      <section className="bg-gray-200 rounded-4xl p-5 md:p-10">
        <section className="md:w-[500px] space-y-5">
          <article>
            <h2 className="text-2xl md:text-4xl font-normal">Password</h2>
            <div className="mt-3 md:w-1/2 md:text-center">
              <button className="px-5 py-2.5 text-lg rounded-2xl bg-white">
                Change your password
              </button>
              <br />
              <small className="text-xs">
                You change your password 9 days ago
              </small>
            </div>
          </article>
          <article>
            <h2 className="text-2xl md:text-4xl font-normal">
              Secondary email
            </h2>
            <div className="mt-3 md:w-1/2 md:text-center">
              <button className="px-6 py-2.5 text-lg rounded-2xl bg-white">
                Add secondary email
              </button>
              <br />
              <small className="text-xs">
                You do not have secondary email.
              </small>
            </div>
          </article>
          <article>
            <h2 className="text-2xl md:text-4xl font-normal">
              Two-step authentication
            </h2>
            <div className="mt-3 md:w-1/2 md:text-center">
              <button className="px-6 py-2.5 text-lg rounded-2xl bg-white">
                Turn on two-step
              </button>
              <br />
              <small className="text-xs">
                After entering your password, verify your identity with an
                authentication method
              </small>
            </div>
          </article>
        </section>
      </section>
    </>
  );
}
