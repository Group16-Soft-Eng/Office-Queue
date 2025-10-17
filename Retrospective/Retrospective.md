TEMPLATE FOR RETROSPECTIVE (Team 16)
=====================================

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs. done: 3/3
- Total points committed vs. done: 7/7
- Nr of hours planned vs. spent (as a team): 71/64

**Remember** a story is done ONLY if it fits the Definition of Done:
 
- Unit Tests passing: not yet
- Code review completed: daily reviews for every task, split in different teams
- Code present on VCS: code uploaded and handled on GitHub
- End-to-End tests performed: test cases defined using Postman

> Please refine your DoD if required (you cannot remove items!)

### Detailed statistics

| Story           | # Tasks | Points | Hours est. | Hours actual |
| --------------- | ------- | ------ | ---------- | ------------ |
| _Uncategorized_ | 5       | 0      | 26         | 23           |
| Get Ticket      | 4       | 2      | 17         | 18           |
| Next Customer   | 4       | 2      | 26         | 21           |
| Config Counters | 1       | 3      | 2          | 2            |

> story `Uncategorized` is for technical tasks, leave out story points (not applicable in this case)

- Hours per task average, standard deviation (estimate and actual)

|            | Mean | StDev |
| ---------- | ---- | ----- |
| Estimation | 5,07 | 2,25  |
| Actual     | 4,57 | 2,13  |

- Total estimation error ratio: sum of total hours spent / sum of total hours effort - 1

    $$\frac{\sum_i spent_{task_i}}{\sum_i estimation_{task_i}} - 1$$
    -0,09
- Absolute relative task estimation error: sum( abs( spent-task-i / estimation-task-i - 1))/n

    $$\frac{1}{n}\sum_i^n \left| \frac{spent_{task_i}}{estimation_task_i}-1 \right| $$
  0,155
## QUALITY MEASURES 

- Unit Testing: not yet
  - Total hours estimated
  - Total hours spent
  - Nr of automated unit test cases 
  - Coverage
- E2E testing:
  - Total hours estimated 2h
  - Total hours spent 2h
  - Nr of test cases 4
- Code review 
  - Total hours estimated 6h
  - Total hours spent 6h
  


## ASSESSMENT

- What did go wrong in the sprint? Initial difficulties in understanding how to work as a newly formed team, causing more effort to be needed

- What caused your errors in estimation (if any)? We didn't make relevant errors in this phase. We were a couple of hours off, probably due to some wrong spent time added because of inexperience with methodology and technology

- What lessons did you learn (both positive and negative) in this sprint? Negative: we should never skip user stories again. Positive: we've learned to use the YouTrack tool much better.

- Which improvement goals set in the previous retrospective were you able to achieve? //
  
- Which ones you were not able to achieve? Why? //

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

  > - More frequent reviews with each other
  > - Improve the way we split tasks between members 

- One thing you are proud of as a Team!! We made it to the end, and we managed to develop the project as a newly formed team. Each one of the members took full responsibility of his tasks and handled them in the best possible way.