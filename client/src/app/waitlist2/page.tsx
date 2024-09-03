export default function Page() {
  return (
    <div className="">
      <form className="w-[32.063rem] h-[41.813rem] border border-[#D7D7D7] rounded-[0.9375rem] px-10 py-7">
        {/* Title & Description */}
        <div>
          <h1>Get Early Access!!</h1>
          <p>
            Be the first to experience our collaborative innovative platform and
            get notified when we launch.
          </p>
        </div>
        {/* Form Fields */}
        <div>
          {/* Brand/Creator Select Btns */}
          <div>
            <label>Join as *</label>
            <div>
              <button type="button">Brand</button>
              <button type="button">Creator</button>
            </div>
          </div>
          {/* First Name */}
          <div>
            <input
              type="text"
              className="w-full"
              placeholder="First Name *"
              id="firstName"
              autoComplete="given-name"
            />
          </div>
          {/* Last Name */}
          <div>
            <input
              type="text"
              className="w-full"
              placeholder="Last Name *"
              id="lastName"
              autoComplete="family-name"
            />
          </div>
          {/* Email */}
          <div>
            <input
              type="email"
              className="w-full"
              placeholder="Email Address *"
              id="email"
              autoComplete="email"
            />
          </div>
          {/* Questionairre */}
          <div>
            <select 
              name="" id=""
              className="w-full border border-[#D7D7D7] rounded-md"
            >
              <option value="">What are you most excited about?</option>
              <option value="">Option 1</option>
              <option value="">Option 2</option>
              <option value="">Option 3</option>
            </select>
          </div>
        </div>
        {/* Submit Button */}
        <div>
          <button type="button">
            Join Waitlist
          </button>
        </div>
      </form>
    </div>
  );
}
