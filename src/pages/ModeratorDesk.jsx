 
import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import { publicAPI } from "../Services/API";

const statusStyles = {
  all: "bg-slate-100 text-slate-700",
  approved: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
  pending: "bg-amber-100 text-amber-700",
};

function ModeratorDesk() {
  const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getMails = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await publicAPI.get(
        `/api/get-companies/${filter}`
      );

      console.log("Companies:", response.data);

      setEntries(response.data.companies);
    } catch (error) {
      console.error("Failed to fetch companies:", error);

      setEntries([]);
      setError("Unable to load company records.");
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (mailId, newStatus) => {
    try {
      const response = await publicAPI.post(
        "/api/change-mail-status",
        {
          mailId,
          newStatus,
        }
      );

      console.log("Status changed:", response.data);

      // Refresh the list after changing status
      getMails();
    } catch (error) {
      console.log({
        error: error.message,
      });

      console.log("Failed status:", newStatus);
    }
  };

  useEffect(() => {
    getMails();
  }, [filter]);

  const handleStatusChange = (e, id) => {
    const selectedCompany = entries.find(
      (entry) => (entry.id || entry._id) === id
    );

    if (!selectedCompany) {
      console.error("Company not found:", id);
      return;
    }

    const status = e.currentTarget.name;

    console.log("Company:", selectedCompany);
    console.log("ID:", id);
    console.log("New status:", status);

    toggleStatus(id, status);
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-8">
      <Navbar />

      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-violet-600">
              Hirelink
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Moderator Desk
            </h1>
          </div>

          <div className="flex items-center gap-3 self-start rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm md:self-auto">
            <label
              htmlFor="status-filter"
              className="text-sm font-medium text-slate-600"
            >
              Filter
            </label>

            <select
              id="status-filter"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
            >
              <option value="all">All</option>
              <option value="rejected">Rejected</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
            </select>
          </div>
        </header>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {loading ? (
            <div className="col-span-full rounded-xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
              <p className="text-lg font-semibold text-slate-700">
                Loading records...
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Fetching companies for the selected filter.
              </p>
            </div>
          ) : error ? (
            <div className="col-span-full rounded-xl border border-red-200 bg-white px-6 py-12 text-center shadow-sm">
              <p className="text-lg font-semibold text-red-600">
                {error}
              </p>

              <button
                type="button"
                onClick={getMails}
                className="mt-4 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-700"
              >
                Try Again
              </button>
            </div>
          ) : entries.length === 0 ? (
            <div className="col-span-full rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-sm">
              <p className="text-lg font-semibold text-slate-700">
                No records found
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Nothing is available for the selected filter yet.
              </p>
            </div>
          ) : (
            entries.map((entry) => {
              const entryId = entry.id || entry._id;

              const status =
                entry.status?.toLowerCase() || "all";

              return (
                <article
                  key={entryId}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-400">
                        Company
                      </p>

                      <h2 className="mt-1 text-xl font-bold text-slate-900">
                        {entry.companyName || "Unnamed Company"}
                      </h2>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        statusStyles[status] || statusStyles.all
                      }`}
                    >
                      {entry.status || "Unknown"}
                    </span>
                  </div>

                  <div className="mt-5 space-y-2 text-sm text-slate-600">
                    <p>
                      <span className="font-medium text-slate-700">
                        Email:
                      </span>{" "}
                      {entry.email || "No email"}
                    </p>

                    <p>
                      <span className="font-medium text-slate-700">
                        Added:
                      </span>{" "}
                      {entry.date || "N/A"}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        console.log("View:", entry)
                      }
                      className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                    >
                      View
                    </button>

                    <button
                      type="button"
                      name="approved"
                      onClick={(e) =>
                        handleStatusChange(e, entryId)
                      }
                      className="rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
                    >
                      Approve
                    </button>

                    <button
                      type="button"
                      name="rejected"
                      onClick={(e) =>
                        handleStatusChange(e, entryId)
                      }
                      className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                </article>
              );
            })
          )}
        </section>
      </div>
    </main>
  );
}

export default ModeratorDesk;
 
