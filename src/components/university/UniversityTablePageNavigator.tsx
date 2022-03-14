import { useEffect, useState } from "react";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleDoubleLeft, faAngleRight, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";

interface UniversityTablePageNavigatorProps {
  initialPage: number;
  numPages: number;
  onChange: (params: { newPage: number }) => void;
}

export function UniversityTablePageNavigator({ initialPage = 1, numPages, onChange }: UniversityTablePageNavigatorProps) {
  const MAX_NUMBER_BUTTONS = 5;

  const [page, _setPage] = useState(initialPage);

  const pageArray = [page];
  while (pageArray.length < MAX_NUMBER_BUTTONS) {
    const right = pageArray[pageArray.length - 1] + 1;
    const left = pageArray[0] - 1;
    if (right <= numPages) pageArray.push(right);
    if (left >= 1) pageArray.unshift(left);
    if (right > numPages && left < 1) break;
  }

  function setPage(number: number) {
    if (number > numPages) number = numPages;
    else if (number < 1) number = 1;
    _setPage(number);
  }

  function pagePrompt() {
    const userInput = window.prompt("Escreva o número da página que você quer acessar");

    if (userInput != null) {
      const desiredPage = parseInt(userInput);
      if (!isNaN(desiredPage)) {
        setPage(desiredPage);
      } else {
        pagePrompt();
      }
    }
  }

  useEffect(() => {
    onChange({
      newPage: page,
    });
  }, [page]);

  return (
    <>
      <div className="flex flex-row gap-3 items-center justify-center w-100 font-bold">
        <div className="page-navigator-button" onClick={() => setPage(1)}>
          <Icon icon={faAngleDoubleLeft} />
        </div>
        <div className="page-navigator-button" onClick={() => setPage(page - 1)}>
          <Icon icon={faAngleLeft} />
        </div>
        <div className="page-navigator-current-page" onClick={pagePrompt}>
          {page} <span className="page-navigator-all-pages"> / {numPages}</span>
        </div>
        <div className="page-navigator-button" onClick={() => setPage(page + 1)}>
          <Icon icon={faAngleRight} />
        </div>
        <div className="page-navigator-button" onClick={() => setPage(numPages)}>
          <Icon icon={faAngleDoubleRight} />
        </div>
      </div>
    </>
  );
}

interface PageButtonProps {
  number: number;
  active?: boolean;
  shrink?: number;
  onClick: () => void;
}

function PageButton({ number, onClick, active = false, shrink = 0 }: PageButtonProps) {
  return (
    <>
      <div className={`w-8 h-8 page-navigator-button ${active ? "active" : ""} shrink-${shrink}`} onClick={onClick}>
        {number}
      </div>
    </>
  );
}
