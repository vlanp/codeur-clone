import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { IOffer } from "../../interfaces/IOffer";

const NewOfferForm = ({
  setOffers,
}: {
  setOffers: Dispatch<SetStateAction<IOffer[]>>;
}) => {
  const initialOfferPrice = 30;
  const initialOfferDuration = 1;
  const initialOfferMessage = "";
  const [offerPrice, setOfferPrice] = useState<number>(initialOfferPrice);
  const [offerDuration, setOfferDuration] =
    useState<number>(initialOfferDuration);
  const [offerMessage, setOfferMessage] = useState<string>(initialOfferMessage);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [durationError, setDurationError] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false);

  const messageMaxLength = 1000;
  const messageLength = offerMessage ? offerMessage.length : 0;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!priceError && !durationError) {
      setSaving(true);
      setOffers((prevOffers) => [
        ...prevOffers,
        {
          price: offerPrice,
          duration: offerDuration,
          message: offerMessage || "",
          id: crypto.randomUUID(),
          publicationDate: new Date(),
        },
      ]);
      setOfferPrice(initialOfferPrice);
      setOfferDuration(initialOfferDuration);
      setOfferMessage(initialOfferMessage);
      setSaving(false);
    }
  };

  useEffect(() => {
    if (offerPrice < 30) {
      setPriceError("Le montant de l'offre doit être au moins de 30.");
    } else if (offerPrice > 100_000) {
      setPriceError("Le montant de l'offre ne peut pas dépasser 100 000.");
    } else {
      setPriceError(null);
    }

    if (offerDuration < 1) {
      setDurationError("Le délai doit être au moins de 1 jour.");
    } else if (offerDuration > 400) {
      setDurationError("Le délai ne peut pas dépasser 400 jours.");
    } else if (!Number.isInteger(offerDuration)) {
      setDurationError("Le délai doit être un nombre entier.");
    } else {
      setDurationError(null);
    }
  }, [offerPrice, offerDuration]);

  return (
    <form
      onSubmit={handleSubmit}
      className="simple_form new_offer"
      id="new_offer"
    >
      <div className="card-body pb-0">
        <fieldset>
          <legend className="mb-4">Mon offre</legend>
          <div className="row">
            <div className="col-lg-6 col-md-8">
              <div className="form-group string optional offer_amount form-group-invalid">
                <label className="string optional" htmlFor="offer_amount">
                  Montant de l'offre<span className="text-muted">*</span>
                </label>
                <div className="input-group border border-gray-200 focus-within:border-[#5089f0] rounded-lg">
                  <input
                    className="numeric float optional form-control border-0 peer pr-0"
                    min="30"
                    max={"100000"}
                    data-form--presence-validator-target="inputs"
                    data-min-value="30"
                    placeholder="Montant…"
                    type="number"
                    id="offer_amount"
                    data-validate="true"
                    name="offer[amount]"
                    step="0.01"
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(parseFloat(e.target.value))}
                  />
                  <div className="select optional input-group-append fluid border-0 bg-transparent !max-w-[60%] [&amp;.ui.dropdown]:!px-3 #[&amp;.ui.selection.dropdown&gt;.dropdown.icon]:!px-2 selection ui dropdown">
                    <select
                      aria-label="false"
                      data-controller="dropdown-ui"
                      name="offer[pricing_mode]"
                      id="offer_pricing_mode"
                    >
                      <option value="flat_rate">pour le projet</option>
                      <option value="daily_rate">par jour</option>
                    </select>
                    <div className="text">par jour</div>
                    <div className="menu transition hidden">
                      <div className="item" data-value="flat_rate">
                        pour le projet
                      </div>
                      <div
                        className="item active selected"
                        data-value="daily_rate"
                      >
                        par jour
                      </div>
                    </div>
                  </div>
                </div>
                {priceError && (
                  <div className="invalid-feedback">{priceError}</div>
                )}
              </div>
            </div>
            <div className="col-lg-6 col-md-8">
              <div className="form-group integer optional offer_duration form-group-invalid">
                <label className="integer optional" htmlFor="offer_duration">
                  Délai<span className="text-muted">*</span>
                </label>
                <div className="input-group border border-gray-200 focus-within:border-[#5089f0] rounded-lg">
                  <input
                    className="numeric integer optional form-control border-0"
                    data-form--presence-validator-target="inputs"
                    placeholder="Délai…"
                    type="number"
                    step="1"
                    name="offer[duration]"
                    id="offer_duration"
                    data-validate="true"
                    min="1"
                    max={"400"}
                    value={offerDuration}
                    onChange={(e) => setOfferDuration(parseInt(e.target.value))}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text bg-transparent border-0">
                      jours
                    </span>
                  </div>
                </div>
                {durationError && (
                  <div className="invalid-feedback">{durationError}</div>
                )}
              </div>
            </div>
          </div>
          <div className="new_comment relative">
            <div className="absolute small right-1 top-3">
              <span className="offer-content-counter">{messageLength}</span>
              <span> / {messageMaxLength} caractères max.</span>
            </div>
            <div
              className="flex rounded-lg p-1 flex-col gap-2 group-data-[input-with-attachment-file-attached-value=false]:flex-col group-data-[input-with-attachment-file-attached-value=false]:lg:flex-row lg:flex-col group-data-[input-with-attachment-expanded-value=true]:lg:flex-col"
              data-controller="input-with-attachment"
              data-input-with-attachment-hide-add-file-btn-value="true"
            >
              <div className="form-group text optional offer_comments_content">
                <label
                  data-controller="tooltip"
                  title=""
                  className="text optional"
                  htmlFor="offer_comments_attributes_0_content"
                  data-bs-original-title="Information cachée"
                >
                  Message privé<span className="text-muted">*</span>
                </label>
                <div className="relative grow flex flex-col justify-center items-start border-gray-100 border focus-within:border-[#5089f0] rounded-lg">
                  <textarea
                    autoComplete="off"
                    rows={10}
                    placeholder="Votre message privé…"
                    className="w-full border-0 rounded-lg focus:ring-0 focus:outline-none p-3 placeholder:text-[#BFBFBFDE] resize-none hover:resize-y focus:resize-y"
                    data-input-with-attachment-target="messageInput"
                    data-characters-counter-target=".offer-content-counter"
                    data-characters-counter-max="1000"
                    data-form--presence-validator-target="inputs"
                    name="offer[comments_attributes][0][content]"
                    id="offer_comments_attributes_0_content"
                    data-validate="true"
                    maxLength={1000}
                    value={offerMessage || ""}
                    onChange={(e) => setOfferMessage(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="card-body">
        <div className="form-actions">
          <input
            type="submit"
            name="commit"
            value="Publier mon offre"
            className="btn btn-primary mr-2"
            data-disable-with="Veuillez patienter…"
            data-form--presence-validator-target="submits"
            disabled={saving || !!priceError || !!durationError}
          />
        </div>
      </div>
    </form>
  );
};

export default NewOfferForm;
