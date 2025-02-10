# ForgeAI Training Data for PHI-2

Welcome to the **ForgeAI** repository! This project contains publicly available training data used to train our AI model, **ForgeAI**. The data includes structured JSON and JSONL files that represent **events**, **enums**, and **functions** within the ForgeScript and ForgeDB ecosystems.

## Overview

ForgeAI is built on top of **PHI-2**, an advanced AI model designed to process complex data structures. The training data in this repository is used to help **ForgeAI** better understand and respond to various **events**, **enums**, and **functions** in the context of the ForgeScript framework. By exploring these files, you can see the training data we use to teach PHI-2.

The repository includes the following data:

- **ForgeDB**: Contains enums, events, and functions specific to the ForgeDB ecosystem.
- **ForgeScript**: Contains enums, events, and functions specific to the ForgeScript ecosystem.

Each dataset is represented as a pair of JSON files:

- A `.json` file that provides the raw data.
- A `.jsonl` file that contains **QA pairs** derived from the raw data to train PHI-2.

## Repository Structure

Here is an overview of the repository structure:

```kotlin
. ├── README.md
  ├── training
  │ ├── ForgeDB
  │ │ ├── enums
  │ │ │ ├── enum.json
  │ │ │ └── training.jsonl
  │ │ ├── events
  │ │ │ ├── forgedb.json
  │ │ │ └── training.jsonl
  │ │ └── functions
  │ │   ├── forgedb.json
  │ │   └── training.jsonl
  │ ├── ForgeScript
  │ │ ├── enums
  │ │ │ ├── forgescript.json
  │ │ │ └── training.jsonl
  │ │ ├── events
  │ │ │ ├── forgescript.json
  │ │ │ └── training.jsonl
  │ │ └── functions
  │ ├── forgescript.json
  │ └── training.jsonl
  └── training.jsonl
```

### Data Formats

- **JSON**: Raw data files used for reference, structured in a way that represents specific events, enums, and functions.
- **JSONL**: A line-separated format that contains question-answer pairs derived from the corresponding JSON data. These pairs are used for training **ForgeAI**.

## How the Data is Used

The training data contained in this repository is used exclusively by our team to train **ForgeAI**, a model built to understand complex data structures like events, enums, and functions. The data is formatted and structured in a way that helps the model learn the correct responses and actions based on the provided information.

This repository is **not** designed to provide tools or scripts for using the data to train your own models. It is meant solely to give you insight into the types of data used to train **ForgeAI**.

## Contributing

While the data in this repository is open for viewing and understanding, please note that the actual tools and scripts for training **ForgeAI** are private. We are not accepting contributions for model training scripts or algorithms at this time. However, you are welcome to explore the data and suggest improvements to the datasets or structure.

## License

This project is open-source and released under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Contact

For questions or further details, please contact the repository maintainers via [email](mailto:admin@lynnux.xyz).

---

**ForgeAI** is built on top of **PHI-2**, designed to enhance AI-driven systems with intelligent responses to complex data structures.
