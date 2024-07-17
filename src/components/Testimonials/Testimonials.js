import Image from "next/image";

function Testimonials() {
  return (
    <div className="px-6 py-20">
      <div className="mx-auto max-w-screen-xl">
        <h2 className="heading">Our Customers can’t live Without us</h2>
        <div className="flex justify-between mt-20 italic lg:text-base  text-sm gap-6 sm:flex-row flex-col">
          <div className="sm:max-w-xs">
          <div className="font-extrabold text-6xl -mb-8">"</div>
            <p>
              "Snac. is just awesome! Now, i wont have to stand in line waiting to pay!
            </p>
            <div className="flex items-center sm:mt-8 mt-4 gap-2">
              <div>
                <Image
                  src="/img/testimonials/customer-1.jpg"
                  alt=""
                  width={45}
                  height={45}
                  objectFit="contain"
                  className="rounded-full"
                />
              </div>

              <span> Dhruv Chabria </span>
            </div>
          </div>
          <div className="sm:max-w-xs">
            <div className="font-extrabold text-6xl -mb-8">"</div>
            <p>
              "Inexpensive, healthy and great-tasting meals, delivered right to
              your fingerti[s]. There have lots of CAS memebers here at TIPS, Me and my family are so in love!
            </p>
            <div className="flex items-center sm:mt-8 mt-4 gap-2">
              <div>
                <Image
                  src="/img/testimonials/customer-2.jpg"
                  alt=""
                  width={45}
                  height={45}
                  objectFit="contain"
                  className="rounded-full"
                />
              </div>

              <span> Diva Sathish </span>
            </div>
          </div>
          <div className="sm:max-w-xs">
           <div className="font-extrabold text-6xl -mb-8">"</div>
            <p>
              I had lots of trouble getting the food i wanted from the food court. Now, thanks to Snac., i can peacefully eat while i watch my juniors play.
            </p>
            <div className="flex items-center sm:mt-8 mt-4 gap-2">
              <div>
                <Image
                  src="/img/testimonials/customer-3.jpg"
                  alt=""
                  width={45}
                  height={45}
                  objectFit="contain"
                  className="rounded-full"
                />
              </div>

              <span>D.Rohit</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
