import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitMessage } from "../hooks/useQueries";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { mutateAsync, isPending } = useSubmitMessage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await mutateAsync({ name, email, message });
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
      toast.success("Message sent! We'll get back to you soon.");
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <section id="contact" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,69,0,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="font-barlow-condensed text-xs tracking-[0.4em] uppercase text-[#FF4500] font-semibold block mb-3">
            Get in Touch
          </span>
          <h2 className="font-bebas text-5xl md:text-7xl text-white leading-none">
            JOIN THE <span className="neon-text-orange">RACE</span>
          </h2>
          <p className="mt-4 text-silver/60 font-body text-lg">
            Want to partner with us, join the team, or just say hello? We'd love
            to hear from you.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="contact-name"
                className="block font-barlow-condensed text-xs tracking-widest uppercase text-silver/50 mb-2"
              >
                Your Name
              </label>
              <input
                id="contact-name"
                data-ocid="contact.input"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alessandro Rossi"
                className="w-full bg-white/5 border border-white/10 text-white placeholder-silver/30 px-4 py-3 font-body text-sm focus:outline-none focus:border-[#FF4500] transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="contact-email"
                className="block font-barlow-condensed text-xs tracking-widest uppercase text-silver/50 mb-2"
              >
                Email Address
              </label>
              <input
                id="contact-email"
                data-ocid="contact.input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="driver@samar.team"
                className="w-full bg-white/5 border border-white/10 text-white placeholder-silver/30 px-4 py-3 font-body text-sm focus:outline-none focus:border-[#FF4500] transition-colors"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="block font-barlow-condensed text-xs tracking-widest uppercase text-silver/50 mb-2"
            >
              Message
            </label>
            <textarea
              id="contact-message"
              data-ocid="contact.textarea"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your interest in Samar Sports Team..."
              className="w-full bg-white/5 border border-white/10 text-white placeholder-silver/30 px-4 py-3 font-body text-sm focus:outline-none focus:border-[#FF4500] transition-colors resize-none"
            />
          </div>

          <button
            data-ocid="contact.submit_button"
            type="submit"
            disabled={isPending}
            className="w-full flex items-center justify-center gap-3 bg-[#FF4500] hover:bg-[#FF6620] disabled:opacity-50 disabled:cursor-not-allowed text-black font-barlow-condensed text-sm font-700 tracking-widest uppercase px-8 py-4 transition-all duration-200 animate-pulse-glow"
          >
            {isPending ? (
              <span className="inline-block w-4 h-4 border-2 border-black/50 border-t-black rounded-full animate-spin" />
            ) : (
              <Send size={16} />
            )}
            {isPending ? "Sending..." : "Send Message"}
          </button>

          {submitted && (
            <motion.div
              data-ocid="contact.success_state"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-4 border border-[#FF4500]/40 bg-[#FF4500]/10"
            >
              <p className="font-barlow-condensed text-sm tracking-widest uppercase text-[#FF4500]">
                Message Received - We'll contact you shortly!
              </p>
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  );
}
